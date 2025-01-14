export interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  accountCreated: string;
  profileImage: string;
  lastPlayed: string;
  overallScore: number;
  totalWins: number;
  totalLoss: number;
  highScore: number;
}
