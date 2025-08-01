const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com";

export interface LoginRequest {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email?: string;
      phoneNumber?: string;
      userName: string;
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
      const requestUrl = `${API_BASE_URL}${endpoint}`;
      const requestBody = body ? JSON.stringify(body) : undefined;

      console.log("Making request to:", requestUrl);
      console.log("Request body:", requestBody);

      const response = await fetch(requestUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", data);

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

  async login(emailOrPhone: string, password: string): Promise<AuthResponse> {
    const loginData: LoginRequest = {
      password,
      ...(emailOrPhone.includes("@")
        ? { email: emailOrPhone }
        : { phoneNumber: emailOrPhone }),
    };

    console.log("Transformed login data:", loginData);
    return this.makeRequest("/api/auth/login", "POST", loginData);
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest("/api/auth/register", "POST", userData);
  }
}

export const authService = new AuthService();
