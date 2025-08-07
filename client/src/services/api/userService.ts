const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com";

export interface ApiUser {
  bio: string;
  _id: string;
  fullName: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  followers?: [];
  following?: [];
  profilePicture?: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  message?: string;
  users?: ApiUser[];
  data?: ApiUser[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface GetUserResponse {
  success: boolean;
  message: string;
  data?: ApiUser;
  error?: string;
}

export class UserService {
  private getAuthToken(): string | null {
    // Try multiple possible token keys
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken")
    );
  }

  private async makeRequest<T>(
    endpoint: string,
    method: string = "GET",
    body?: object
  ): Promise<T> {
    try {
      const token = this.getAuthToken();

      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const requestUrl = `${API_BASE_URL}${endpoint}`;
      console.log("Making request to:", requestUrl);
      console.log(
        "Using token:",
        token ? `${token.substring(0, 10)}...` : "None"
      );

      const response = await fetch(requestUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("authToken");
          localStorage.removeItem("jwt");
          localStorage.removeItem("accessToken");
          throw new Error("Authentication failed. Please log in again.");
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async getAllUsers(): Promise<GetAllUsersResponse> {
    try {
      const response = await this.makeRequest<GetAllUsersResponse>(
        "/api/auth/getall"
      );

      const users = response.users || response.data || [];

      return {
        success: true,
        message: response.message || "Users fetched successfully",
        users: users,
        data: users,
        pagination: response.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch users",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getUserByIdentifier(identifier: string): Promise<GetUserResponse> {
    try {
      const response = await this.makeRequest<unknown>(
        `/api/auth/getme/${identifier}`
      );
      console.log("From API here: ", response);
      console.log("Username ", identifier);

      return {
        success: true,
        message: "User fetched successfully",
        data: response as ApiUser,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch user",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getUserByUsername(username: string): Promise<GetUserResponse> {
    try {
      const response = await this.makeRequest<GetUserResponse>(
        `/api/auth/getme/${username}`
      );

      if (response.success && response.data) {
        console.log(response);
        return {
          success: true,
          message: response.message || "User fetched successfully",
          data: response.data,
        };
      }

      return {
        success: false,
        message: "User not found",
        error: "User not found",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch user",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  transformApiUser(apiUser: ApiUser): {
    id: string;
    username: string;
    displayName: string;
    fullName: string;
    email?: string;
    phoneNumber?: string;
    avatar: string;
    bio: string;
  } {
    return {
      id: apiUser._id,
      username: apiUser.userName,
      displayName: apiUser.fullName,
      fullName: apiUser.fullName,
      email: apiUser.email,
      phoneNumber: apiUser.phoneNumber,
      avatar:
        apiUser.profilePicture ||
        `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541`,
      bio: apiUser.bio,
    };
  }

  filterUsers(users: ApiUser[], query: string): ApiUser[] {
    if (!query.trim()) return users;

    const searchTerm = query.toLowerCase().trim();

    return users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.userName.toLowerCase().includes(searchTerm) ||
        (user.email && user.email.toLowerCase().includes(searchTerm))
    );
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  clearAuth(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("jwt");
    localStorage.removeItem("accessToken");
  }
}

export const userService = new UserService();
