const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    accountCreated: String!
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
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    getUserProfile(userName: String!): UserProfile 
    getUserData(userName: String!): User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    updateProfileImage(userName: String!, profileImage: String!): UserProfile
  }
`;

export default typeDefs;
