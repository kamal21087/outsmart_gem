import { Document, Schema, model } from 'mongoose';

// Interface defining the structure of user profile data in the database
interface IUserProfile extends Document {
  profileImage: string;
  lastPlayed: Date;
  overallScore: number;
  totalWins: number;
  totalLoss: number;
  highScore: number;
  playerRank: number;
}

// Schema for the user profile collection
const userProfileSchema = new Schema<IUserProfile>({
  profileImage: { 
    type: String, 
    required: true },

  lastPlayed: { 
    type: Date, 
    required: true },

  overallScore: { 
    type: Number, 
    required: true },

  totalWins: { 
    type: Number, 
    required: true },

  totalLoss: { 
    type: Number, 
    required: true },

  highScore: { 
    type: Number, 
    required: true },

  playerRank: { 
    type: Number, 
    required: true },
});

// Model for the user profile collection 
const UserProfile = model<IUserProfile>('UserProfile', userProfileSchema); 

export default UserProfile;
