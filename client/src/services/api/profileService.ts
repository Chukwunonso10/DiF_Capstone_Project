const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com";

export interface UpdateProfileData {
  fullName?: string;
  userName?: string;
  bio?: string;
  website?: string;
  profilePicture?: string;
  gender?: string;
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

  private getStoredUser(): unknown {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  }

  private updateStoredUser(updates: Partial<unknown>): void {
    try {
      const currentUser = this.getStoredUser() || {};
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating stored user:", error);
    }
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

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = {
            message: errorText || `HTTP error! status: ${response.status}`,
          };
        }
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

  // Update user profile using the real API endpoint
  async updateProfile(
    profileData: UpdateProfileData
  ): Promise<UpdateProfileResponse> {
    try {
      // Validate required fields before making the API call
      if (profileData.fullName !== undefined && !profileData.fullName.trim()) {
        return {
          success: false,
          message: "Full name is required",
          error: "Full name is required",
        };
      }

      if (profileData.userName !== undefined && !profileData.userName.trim()) {
        return {
          success: false,
          message: "Username is required",
          error: "Username is required",
        };
      }

      // Prepare the payload according to API documentation
      const apiPayload = {
        FullName: profileData.fullName,
        UsernName: profileData.userName, // Note: API expects 'UsernName' (typo in API)
        Bio: profileData.bio,
        Profilepicture: profileData.profilePicture,
        Website: profileData.website,
        Gender: profileData.gender,
      };

      // Remove undefined values
      const cleanPayload = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(apiPayload).filter(([_, value]) => value !== undefined)
      );

      console.log("Sending profile update payload:", cleanPayload);

      const response = await this.makeRequest<UpdateProfileResponse>(
        "/api/auth/profile",
        "PUT",
        cleanPayload
      );

      // Update local storage immediately for persistence
      if (response.success) {
        this.updateStoredUser({
          fullName: profileData.fullName,
          userName: profileData.userName,
          username: profileData.userName, // For backward compatibility
          bio: profileData.bio,
          website: profileData.website,
          profilePicture: profileData.profilePicture,
          gender: profileData.gender,
        });
      }

      return {
        success: true,
        message: response.message || "Profile updated successfully",
        data: response.data,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update profile",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Upload profile picture - since no specific endpoint is provided for image upload,
  // we'll use the profile update endpoint with the image URL
  async uploadProfilePicture(file: File): Promise<UploadImageResponse> {
    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return {
          success: false,
          message: "Please select an image file",
          error: "Invalid file type",
        };
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          message: "Please select an image smaller than 5MB",
          error: "File too large",
        };
      }

      // For now, create a local URL and update profile
      // In a real scenario, you'd upload to a file service first
      const imageUrl = URL.createObjectURL(file);

      // Update profile with new image URL
      const updateResult = await this.updateProfile({
        profilePicture: imageUrl,
      });

      if (updateResult.success) {
        return {
          success: true,
          message: "Profile picture uploaded successfully",
          data: { url: imageUrl },
        };
      } else {
        return {
          success: false,
          message: updateResult.message || "Failed to upload profile picture",
          error: updateResult.error || "Upload failed",
        };
      }
    } catch (error) {
      console.error("Profile picture upload error:", error);
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

  // Remove profile picture by setting it to default
  async removeProfilePicture(): Promise<UpdateProfileResponse> {
    try {
      const defaultImage =
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

      const updateResult = await this.updateProfile({
        profilePicture: defaultImage,
      });

      return {
        success: updateResult.success,
        message: updateResult.message || "Profile picture removed successfully",
        data: updateResult.data,
        error: updateResult.error,
      };
    } catch (error) {
      console.error("Profile picture removal error:", error);
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

  // Get current user profile (optional - for fetching latest data)
  async getCurrentProfile(): Promise<UpdateProfileResponse> {
    try {
      const response = await this.makeRequest<UpdateProfileResponse>(
        "/api/auth/profile",
        "GET"
      );

      // Update local storage with latest data
      if (response.success && response.data?.user) {
        this.updateStoredUser(response.data.user);
      }

      return response;
    } catch (error) {
      console.error("Get profile error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get profile",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const profileService = new ProfileService();
