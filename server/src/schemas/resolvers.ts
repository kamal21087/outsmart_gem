import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
import formatQuestion from '../utils/formatQuestion.js';
import { User, Gamelog, UserProfile } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface AddGamelogArgs {
  input: {
    userQuestions: string[];
    aiResponses: string[];
    results: string;
    score: number;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

// GraphQL resolvers for handling queries and mutations
const resolvers = {
  Query: {
    // Query to get the authenticated user's information
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    // Resolver for fetching user profile
    getUserProfile: async (_: any, { userName }: { userName: string }) => {
      try {
        const userProfile = await UserProfile.findOne({ userName });
        return userProfile;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error('Error fetching user profile');
      }
    },

    // Resolver for fetching user data
    getUserData: async (_: any, { userName }: { userName: string }) => {
      try {
        const userData = await User.findOne({ userName });
        return userData;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Error fetching user data');
      }
    },
  },

  Mutation: {
    // Mutation for adding a new user
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Mutation for logging in a user
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Mutation for sending a question to Gemini
    askGemini: async (_parent: any, question: string) => {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        const formattedQuestion = formatQuestion(question);
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          formattedQuestion,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error('Failed to extract text from API response.');
        }

        return text.trim();
      } catch (error: any) {
        if (error.response) {
          console.error('Gemini API error response:', error.response.data);
        } else {
          console.error('Error asking Gemini:', error.message);
        }
        throw new Error('Failed to send data to the external API.');
      }
    },

    // Mutation for adding a game log
    addGamelog: async (_parent: any, { input }: AddGamelogArgs, context: any) => {
      if (context.user) {
        //Create a new game log entry
        const gamedata = await Gamelog.create({
          ...input,
          playerId: context.user._id,
        });

        const { score, results } = input;

        // Update user profile with cumulative score, wins, and losses
        const update: any = {
          $inc: {
            overallScore: score || 0,
            totalWins: results === 'W' ? 1 : 0,
            totalLoss: results === 'L' ? 1 : 0,
          },
          $set: {
            lastPlayed: new Date(),
          }
        };

        // Fetch the current high score
        const userProfile = await UserProfile.findOne({ userName: context.user.username });
        const currentHighScore = userProfile?.highScore ?? 0;

        // Check if the new score is a high score
        if (score > currentHighScore) {
          update.$set = update.$set || {};
          // Update the high score if the new score is higher
          update.$set = { highScore: score };
        }

        // Update the user's profile
        await UserProfile.findOneAndUpdate(
          { userName: context.user.username },
          update,
          { new: true }
        );

        return gamedata;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Mutation for updating the profile image
    updateProfileImage: async (
      _: any,
      { userName, profileImage }: { userName: string; profileImage: string }
    ) => {
      try {
        const userProfile = await UserProfile.findOneAndUpdate(
          { userName },
          { profileImage },
          { new: true }
        );
        return userProfile;
      } catch (error) {
        console.error('Error updating profile image:', error);
        throw new Error('Error updating profile image');
      }
    },
  },
};

export default resolvers;