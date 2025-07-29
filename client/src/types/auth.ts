export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export interface AuthState {
  isLoading: boolean;
  error: AuthError | null;
  user: User | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
}
