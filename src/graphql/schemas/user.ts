import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: String!
    email: String!
    first_name: String!
    last_name: String!
    age: Int!
    created_at: String!
    updated_at: String!
  }

  type AuthPayload {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, first_name: String!, last_name: String!, age: Int!): AuthPayload!
    signin(email: String!, password: String!): AuthPayload!
    logout: Boolean!
  }
`;
