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
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    
    getUserProfile: async (_parent: any, { id }:any, context:any) => {
      if (context.user) {
        try {
          const userProfile = await UserProfile.findById(id);
          console.log('UserProfile:', userProfile); // Debug log
          return userProfile;
        } catch (error) {
          console.error('Error fetching user profile:', error);
          throw new Error('Error fetching user profile');
        }
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    getUserData: async (_parent:any, { id }:any, context:any) => {
      if (context.user) {
        try {
          const userData = await User.findById(id);
          console.log('UserData:', userData); // Debug log
          return userData;
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw new Error('Error fetching user data');
        }
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    
    // Resolver for getting current user avatar
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
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
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

    // Mutation for sending a question to Gemini
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
        console.log('Context User:', context.user); // Debug log
        //Create a new game log entry
        const gamedata = await Gamelog.create({
          ...input,
          playerId: context.user.id,
        });

        const { score, results } = input;

        const update = {
          $inc: {
            cumulativeScore: score || 0,
            wins: results === 'W' ? 1 : 0,
            losses: results === 'L' ? 1 : 0,
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
