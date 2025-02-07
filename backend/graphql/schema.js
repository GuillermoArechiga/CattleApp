import { gql } from "apollo-server-koa";

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    phone: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    registerUser(name: String!, email: String!, phone: String!, password: String!): User
    loginUser(email: String!, password: String!): AuthPayload
    addUser(name: String!, email: String!, phone: String!): User
  }
`;

export default typeDefs;