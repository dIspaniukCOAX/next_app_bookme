export interface IUser {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  age?: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age?: number;
}

export interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
  age?: number;
}
