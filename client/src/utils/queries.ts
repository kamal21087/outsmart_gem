import { gql } from '@apollo/client';

// Define the GraphQL query to get the user data
export const GET_USER_DATA = gql`
  query getUserData($id: ID!) {
    getUserData(id: $id) {
      _id
      username
      email
      accountCreated
      profileImage 
      overallScore 
      totalWins 
      totalLoss 
      highScore
    }
  }
`;

export const GET_USER_AVATAR = gql`
  query getUserAvatar {
    getUserAvatar
  }
`;

export const GET_LOGGED_IN_USERNAME = gql`
  query getLoggedInUsername {
    getLoggedInUsername
  }
`;