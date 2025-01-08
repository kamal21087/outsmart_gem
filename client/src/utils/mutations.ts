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
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

// Define the GraphQL mutation to update the profile image
export const UPDATE_PROFILE_IMAGE = gql`
  mutation updateProfileImage($userName: String!, $profileImage: String!) {
    updateProfileImage(userName: $userName, profileImage: $profileImage) {
      profileImage
    }
  }
`;

export const ASK_GEMINI = gql`
  mutation AskGemini($question: String!) {
    askGemini(question: $question)
  }
`;