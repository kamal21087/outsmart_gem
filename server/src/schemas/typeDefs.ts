const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    accountCreated: String!
  }

  type Gamelog {
    _id: ID
    username: String!
    userQuestions: [String]
    aiResponses: [String]
    results: String!
    score: Int!
  }
  
  type UserProfile { 
  profileImage: String! 
  lastPlayed: String! 
  overallScore: Int! 
  totalWins: Int! 
  totalLoss: Int! 
  highScore: Int! 
  playerRank: Int! 
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input AddGamelogInput {
    userQuestions: [String]
    aiResponses: [String]
    results: String!
    score: Int!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    askGuessWhoGemini(question: String!): String!
    me: User
    getUserProfile(userName: String!): UserProfile 
    getUserData(userName: String!): User
    getUserAvatar(): String!
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    askGemini(question: String!): String!
    addGamelog(input: AddGamelogInput!): Gamelog
    updateProfileImage(userName: String!, profileImage: String!): UserProfile
  }
`;

export default typeDefs;