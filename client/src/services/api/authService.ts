const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      username: string;
      fullName: string;
    };
    token: string;
  };
  error?: string;
}

export class AuthService {
  private async makeRequest<T extends object>(
    endpoint: string,
    method: string,
    body?: T
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "An error occurred",
          error: data.error || "Unknown error",
        };
      }

      return {
        success: true,
        message: data.message || "Success",
        data: data.data || data,
      };
    } catch (error) {
      console.error("API Error:", error);
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest("/auth/login", "POST", credentials);
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest("/auth/register", "POST", userData);
  }
}

export const authService = new AuthService();
