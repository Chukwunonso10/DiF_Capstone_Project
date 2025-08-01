export interface LoginFormData {
  usernameOrEmail: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
}

export const VALIDATION_RULES = {
  email: {
    required: "Email or phone number is required",
    pattern: {
      // Matches either email OR phone (10-15 digits)
      value: /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|[0-9]{10,15})$/i,
      message: "Please enter a valid email or phone number",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  fullName: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Full name must be at least 2 characters",
    },
  },
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9_.]+$/,
      message:
        "Username can only contain letters, numbers, dots, and underscores",
    },
  },
};
