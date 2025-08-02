const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com";

export interface ApiUser {
  _id: string;
  fullName: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
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
    return localStorage.getItem("authToken");
  }

  private async makeRequest<T>(
    endpoint: string,
    method: string = "GET",
    body?: object
  ): Promise<T> {
    try {
      const token = this.getAuthToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestUrl = `${API_BASE_URL}${endpoint}`;
      console.log("Making request to:", requestUrl);

      const response = await fetch(requestUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

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
      const response = await this.makeRequest<GetUserResponse>(
        `/api/auth/getme/${identifier}`
      );
      return {
        success: true,
        message: response.message || "User fetched successfully",
        data: response.data,
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
  } {
    return {
      id: apiUser._id,
      username: apiUser.userName,
      displayName: apiUser.fullName,
      fullName: apiUser.fullName,
      email: apiUser.email,
      phoneNumber: apiUser.phoneNumber,

      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        apiUser.fullName
      )}&background=random&color=fff&size=40`,
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
}

export const userService = new UserService();
