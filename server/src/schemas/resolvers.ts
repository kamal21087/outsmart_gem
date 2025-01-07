import { User, UserProfile } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

// GraphQL resolvers for handling queries and mutations
const resolvers = {
  Query: {
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      // If the user is not authenticated, throw an AuthenticationError
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
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    // Resolver for updating profile image
    updateProfileImage: async (_: any, { userName, profileImage }: { userName: string, profileImage: string }) => {
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

