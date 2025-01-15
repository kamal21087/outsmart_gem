import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      user {
        _id
        username
        email
      }
      token
    }
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($profileImage: String!) {
    updateProfileImage(profileImage: $profileImage) {
      _id
      profileImage
    }
  }
`;

export const ASK_GEMINI = gql`
  mutation askGemini($question: String!) {
    askGemini(question: $question)
  }
`;

export const ADD_GAMELOG = gql`
  mutation AddGamelog($input: AddGamelogInput!) {
    addGamelog(input: $input) {
      _id
      userQuestions
      aiResponses
      results
      score
      createdAt
      playerId
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
