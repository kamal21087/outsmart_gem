import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface defining the structure of user data in the database
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  accountCreated: Date;
  isCorrectPassword(password: string): Promise<boolean>;
  profileImage: string;
  lastPlayed: Date;
  overallScore: number;
  totalWins: number;
  totalLoss: number;
  highScore: number;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    accountCreated: { 
      type: Date, 
      default: Date.now, // Automatically sets the account creation date
      required: true,
    },
    profileImage: { 
      type: String, 
      default: '/images/option1.webp',
      required: true 
    },
    lastPlayed: { 
      type: Date,
      default: Date.now, 
      required: true 
    },
    overallScore: { 
      type: Number, 
      default: 0,
      required: true 
    },
    totalWins: { 
      type: Number, 
      default: 0,
      required: true 
    },
    totalLoss: { 
      type: Number, 
      default: 0,
      required: true 
    },
    highScore: { 
      type: Number, 
      default: 0,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
