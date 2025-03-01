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

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  type Mutation {
    createUser(email: String!, password: String!, first_name: String!, last_name: String!, age: Int!): User!
  }
`;
