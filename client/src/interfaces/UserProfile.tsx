export interface UserProfile {
    username: string | null;
    profileImage: string;
    lastPlayed: string;
    overallScore: number;
    totalWins: number;
    totalLoss: number;
    highScore: number;
    playerRank: number;
  }