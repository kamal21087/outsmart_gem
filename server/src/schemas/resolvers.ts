import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
import formatQuestion from '../utils/formatQuestion.js';
import { User, Gamelog } from '../models/index.js';
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
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    getUserData: async (_parent: any, { id }: any, context: any) => {
      if (context.user) {
        try {
          // Fetch user data
          const userData = await User.findById(id);
          console.log('UserData:', userData); // Debug log

          return userData;
        } catch (error) {
          console.error('Error fetching user data and profile:', error);
          throw new Error('Error fetching user data and profile');
        }
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    getUserAvatar: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select('profileImage');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    getLoggedInUsername: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        try {
          const user = await User.findOne({ _id: context.user._id });
          if (!user) {
            throw new Error('User not found');
          }
          return user.username;
        } catch (error) {
          console.error('Error fetching logged-in user username:', error);
          throw new Error('Error fetching username');
        }
      }
      throw new AuthenticationError('User is not authenticated.');
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      try {
      const user = await User.create({ ...input,
        profileImage: '/images/option1.webp', 
        lastPlayed: new Date(), 
        overallScore: 0, 
        totalWins: 0, 
        totalLoss: 0,  
        highScore: 0,
       });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    } catch (error) { 
      console.error('Error adding user:', error); 
      throw new Error('Error adding user'); }
    },

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

    askGemini: async (_parent: any, question: any) => {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        const formattedQuestion = formatQuestion(question?.question);

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
          console.error('Invalid API response:', response.data);
          throw new Error('Failed to process Gemini response.');
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

    addGamelog: async (_parent: any, { input }: AddGamelogArgs, context: any) => {
      if (context.user) {
        // Create a new game log entry
        const gamedata = await Gamelog.create({
          ...input,
          playerId: context.user._id,
        });

        const { score, results } = input;

        const update = {
          $inc: {
            overallScore: score || 0,
            totalWins: results === 'W' ? 1 : 0,
            totalLoss: results === 'L' ? 1 : 0,
          },
        };

        await User.findOneAndUpdate(
          { _id: context.user._id },
          update,
          { new: true }
        );

        return gamedata;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    updateProfileImage: async (_: any, { profileImage }: { profileImage: string }, context: any) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { profileImage },
            { new: true }
          );
          console.log('Updated User Profile Image:', updatedUser); // Debug log

          // Check if updatedUser is null
          if (!updatedUser) {
            console.error('User not found for ID:', context.user._id);
            throw new Error(`User not found for ID: ${context.user._id}`);
          }

          return updatedUser;
        } catch (error) {
          console.error('Error updating profile image:', error);
          throw new Error('Error updating profile image');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;

