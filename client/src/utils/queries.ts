import { gql } from '@apollo/client';

// Define the GraphQL query to get the user profile
// export const GET_USER_PROFILE = gql`
//   query getUserProfile($id: ID!) {
//     getUserProfile(id: $id) {
//       username
//       profileImage
//       lastPlayed
//       overallScore
//       totalWins
//       totalLoss
//       highScore
//     }
//   }
// `;

// Define the GraphQL query to get the user data
export const GET_USER_DATA = gql`
  query getUserData($id: ID!) {
    getUserData(id: $id) {
      _id
      username
      email
      accountCreated
      profileImage
      lastPlayed
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

export const GET_USER_GAME_LOGS = gql`
  query getUserGameLogs($playerId: ID!) {
    getUserGameLogs(playerId: $playerId) {
      _id
      userQuestions
      aiResponses
      results
      score
      createdAt
    }
  }
`;

export const DELETE_GAME_LOG = gql`
  mutation deleteGameLog($logId: ID!) {
    deleteGameLog(logId: $logId) {
      _id
    }
  }
`;