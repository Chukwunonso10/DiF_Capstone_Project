/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/api/userService.ts

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
  followers?: string[];
  following?: string[];
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

export interface FollowResponse {
  success: boolean;
  message: string;
  isFollowing?: boolean;
  updatedUser?: ApiUser; // Add updated user data
  error?: string;
}

export class UserService {
  private getAuthToken(): string | null {
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
          this.clearAuth();
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
      const response = await this.makeRequest<any>("/api/auth/getall");

      const users = Array.isArray(response)
        ? response
        : response.users || response.data || [];

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
      const response = await this.makeRequest<any>(
        `/api/auth/getme/${identifier}`
      );
      console.log("From API here:", response);

      if (response && response._id) {
        return {
          success: true,
          message: "User fetched successfully",
          data: response as ApiUser,
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

  async toggleFollow(userId: string): Promise<FollowResponse> {
    try {
      const response = await this.makeRequest<any>(
        `/api/auth/${userId}`,
        "PATCH"
      );

      console.log("Toggle follow response:", response);

      return {
        success: true,
        message: response.message || "Follow status updated",
        isFollowing: response.isFollowing ?? !response.isUnfollowed, // Handle both cases
        updatedUser: response.user || response.data, // Include updated user data
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update follow status",
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
      bio: apiUser.bio || "",
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
