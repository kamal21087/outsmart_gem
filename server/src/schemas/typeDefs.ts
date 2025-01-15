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
    gameLogs: [Gamelog!] # Fetch game logs associated with the user
  }

  # Gamelog type representing a user's gameplay session
  type Gamelog {
    _id: ID!
    userQuestions: [String!]!
    aiResponses: [String!]!
    results: String!
    score: Int!
    createdAt: String! 
    playerId: ID!
  }

  # Input type for creating a new user
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  # Input type for adding a gamelog
  input AddGamelogInput {
    userQuestions: [String!]!
    aiResponses: [String!]!
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
    topScorers: [User!]!
    user(username: String!): User
    me: User
    getUserData(id: ID!): User
    getUserAvatar: String!
    getLoggedInUsername: String!
    getUserGameLogs(playerId: ID): [Gamelog!]! # Fetch all game logs for a specific user
  }

  # Root Mutation type
  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    askGemini(question: String!): String!
    addGamelog(input: AddGamelogInput!): Gamelog
    updateProfileImage(profileImage: String!): User
    deleteGameLog(logId: ID!): Gamelog # Delete a specific game log by ID
  }
`;

export default typeDefs;
