import { gql } from '@apollo/client';

// Define the GraphQL query to get the user profile
export const GET_USER_PROFILE = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      username
      profileImage
      lastPlayed
      overallScore
      totalWins
      totalLoss
      highScore
    }
  }
`;

// Define the GraphQL query to get the user data
export const GET_USER_DATA = gql`
  query getUserData($id: ID!) {
    getUserData(id: $id) {
      _id
      username
      email
      accountCreated
    }
  }
`;

