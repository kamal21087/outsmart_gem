const typeDefs = `#graphql
  scalar Date

  # User type representing a user in the system
  type User {
    _id: ID!
    username: String!
    email: String!
    accountCreated: Date!
    profileImage: String! 
    overallScore: Int! 
    totalWins: Int! 
    totalLoss: Int! 
    highScore: Int!
  }

  # Gamelog type representing a user's gameplay session
  type Gamelog {
    _id: ID!
    userQuestions: [String]
    aiResponses: [String]
    results: String!
    score: Int!
    createdAt: String! 
    playerId: ID!
  }
  
  # type UserProfile { 
  # username: String!
  # profileImage: String! 
  # overallScore: Int! 
  # totalWins: Int! 
  # totalLoss: Int! 
  # highScore: Int!
  # }

  # Input type for creating a new user
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  # Input type for adding a gamelog
  input AddGamelogInput {
    userQuestions: [String]
    aiResponses: [String]
    results: String!
    score: Int!
  }

  # Auth type for authentication responses
  type Auth {
    token: ID!
    user: User
  }

  # Root Query type
  type Query {
    users: [User!]!
    user(username: String!): User
    me: User
    # getUserProfile(username: String!): UserProfile
    getUserData(id: ID!): User
    getUserAvatar: String!
    getLoggedInUsername: String!
  }

  # Root Mutation type
  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    askGemini(question: String!): String!
    addGamelog(input: AddGamelogInput!): Gamelog
    updateProfileImage(profileImage: String!): User
  }
`;

export default typeDefs;
