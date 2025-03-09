export interface IUser {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  age?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ICreateUserInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age: number;
}

export interface IUpdateUserInput {
  first_name?: string;
  last_name?: string;
  age?: number;
}
