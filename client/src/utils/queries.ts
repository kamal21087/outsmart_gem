import { gql } from '@apollo/client';

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

export const GET_USERNAME_AVATAR = gql`
  query me {
    me {
      username
      profileImage
    }
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
