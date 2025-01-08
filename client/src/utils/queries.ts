import { gql } from '@apollo/client';

// Define the GraphQL query to get the user profile
export const GET_USER_PROFILE = gql`
  query getUserProfile($userName: String!) {
    getUserProfile(userName: $userName) {
      profileImage
      lastPlayed
      overallScore
      totalWins
      totalLoss
      highScore
      playerRank
    }
  }
`;

// Define the GraphQL query to get the user data
export const GET_USER_DATA = gql`
  query getUserData($userName: String!) {
    getUserData(userName: $userName) {
      id
      username
      email
      accountCreated
    }
  }
`;

