import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $first_name: String!, $last_name: String!, $age: Int!) {
    signup(email: $email, password: $password, first_name: $first_name, last_name: $last_name, age: $age) {
      user {
        id
        email
        first_name
        last_name
        age
        created_at
        updated_at
      }
    }
  }
`;

export const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        email
        first_name
        last_name
        age
        created_at
        updated_at
      }
      accessToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
