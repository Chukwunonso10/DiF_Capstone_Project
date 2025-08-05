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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getStoredUser(): any {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private updateStoredUser(updates: Partial<any>): void {
    try {
      const currentUser = this.getStoredUser() || {};
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating stored user:", error);
    }
  }

  // Simulate API delay
  private async simulateDelay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Update user profile (frontend-only)
  async updateProfile(
    profileData: UpdateProfileData
  ): Promise<UpdateProfileResponse> {
    try {
      await this.simulateDelay();

      // Validate required fields
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

      // Update local storage
      this.updateStoredUser(profileData);

      return {
        success: true,
        message: "Profile updated successfully",
        data: { user: { ...this.getStoredUser(), ...profileData } },
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

  // Upload profile picture (frontend-only)
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

      await this.simulateDelay(1000);

      // Create a local URL for the file
      const imageUrl = URL.createObjectURL(file);

      // Update local storage
      this.updateStoredUser({ profilePicture: imageUrl });

      return {
        success: true,
        message: "Profile picture uploaded successfully",
        data: { url: imageUrl },
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

  // Remove profile picture (frontend-only)
  async removeProfilePicture(): Promise<UpdateProfileResponse> {
    try {
      await this.simulateDelay();

      const defaultImage =
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

      // Update local storage
      this.updateStoredUser({ profilePicture: defaultImage });

      return {
        success: true,
        message: "Profile picture removed successfully",
        data: {
          user: { ...this.getStoredUser(), profilePicture: defaultImage },
        },
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
