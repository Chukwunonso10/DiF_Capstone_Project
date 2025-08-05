const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com";

export interface UpdateProfileData {
  fullName?: string;
  userName?: string;
  bio?: string;
  website?: string;
  profilePicture?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: {
    user?: unknown;
    [key: string]: unknown;
  };
  error?: string;
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  data?: {
    url: string;
    publicId?: string;
  };
  error?: string;
}

export class ProfileService {
  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  private async makeRequest<T>(
    endpoint: string,
    method: string = "GET",
    body?: object | FormData
  ): Promise<T> {
    try {
      const token = this.getAuthToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestUrl = `${API_BASE_URL}${endpoint}`;
      console.log("Making request to:", requestUrl);

      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };

      // Only add Content-Type for JSON data, not FormData
      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(requestUrl, {
        method,
        headers,
        body:
          body instanceof FormData
            ? body
            : body
            ? JSON.stringify(body)
            : undefined,
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

  // Update user profile
  async updateProfile(
    profileData: UpdateProfileData
  ): Promise<UpdateProfileResponse> {
    try {
      const response = await this.makeRequest<UpdateProfileResponse>(
        "/api/auth/update-profile",
        "PUT",
        profileData
      );

      // Update local storage immediately for persistence
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...currentUser,
        ...profileData,
        userName:
          profileData.userName || currentUser.userName || currentUser.username,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        success: true,
        message: response.message || "Profile updated successfully",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update profile",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<UploadImageResponse> {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await this.makeRequest<UploadImageResponse>(
        "/api/auth/upload-profile-picture",
        "POST",
        formData
      );

      // Update local storage immediately for persistence
      if (response.success && response.data?.url) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = {
          ...currentUser,
          profilePicture: response.data.url,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      return {
        success: true,
        message: response.message || "Profile picture uploaded successfully",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to upload profile picture",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Remove profile picture (set to default)
  async removeProfilePicture(): Promise<UpdateProfileResponse> {
    try {
      const response = await this.makeRequest<UpdateProfileResponse>(
        "/api/auth/remove-profile-picture",
        "DELETE"
      );

      // Update local storage immediately for persistence
      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const defaultImage =
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
        const updatedUser = {
          ...currentUser,
          profilePicture: defaultImage,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      return {
        success: true,
        message: response.message || "Profile picture removed successfully",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to remove profile picture",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const profileService = new ProfileService();
