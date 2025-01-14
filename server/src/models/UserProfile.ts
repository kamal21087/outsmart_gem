// import { Document, Schema, model } from 'mongoose';

// // Interface defining the structure of user profile data in the database
// interface IUserProfile extends Document {
//   username: string;
//   profileImage: string;
//   overallScore: number;
//   totalWins: number;
//   totalLoss: number;
//   highScore: number;
// }

// // Schema for the user profile collection
// const userProfileSchema = new Schema<IUserProfile>({
//   username: { 
//     type: String, 
//     unique: true,
//     required: true },

//   profileImage: { 
//     type: String, 
//     required: true },

//   overallScore: { 
//     type: Number, 
//     default: 0,
//     required: true },

//   totalWins: { 
//     type: Number, 
//     default: 0,
//     required: true },

//   totalLoss: { 
//     type: Number, 
//     default: 0,
//     required: true },

//   highScore: { 
//     type: Number, 
//     default: 0,
//     required: true }
// });

// // Model for the user profile collection 
// const UserProfile = model<IUserProfile>('UserProfile', userProfileSchema); 

// export default UserProfile;
