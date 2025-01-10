import { gql } from '@apollo/client';

// Mutation for user login
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

// Mutation for adding a new user
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

// Mutation to update the profile image
export const UPDATE_PROFILE_IMAGE = gql`
  mutation updateProfileImage($userName: String!, $profileImage: String!) {
    updateProfileImage(userName: $userName, profileImage: $profileImage) {
      profileImage
    }
  }
`;

// Mutation to ask a question to Gemini AI
export const ASK_GEMINI = gql`
  mutation askGemini($question: String!) {
    askGemini(question: $question)
  }
`;

export const ADD_GAMELOG = gql`
  mutation AddGamelog($input: AddGamelogInput!) {
    addGamelog(input: $input) {
      id
      userQuestions
      aiResponses
      results
      score
      createdAt
      playerId
    }
  }
`;
