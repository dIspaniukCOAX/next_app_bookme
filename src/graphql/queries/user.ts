import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      first_name
      last_name
      age
      created_at
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      email
      first_name
      last_name
      age
      created_at
      updated_at
    }
  }
`;
