import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  profileService,
  type UpdateProfileData,
} from "../services/api/profileService";

interface UseProfileReturn {
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  uploadProfilePicture: (file: File) => Promise<string | null>;
  removeProfilePicture: () => Promise<boolean>;
  refreshProfile: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useProfile = (): UseProfileReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUserProfile } = useAuthContext();

  const clearError = () => setError(null);

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        setError("User not found");
        return false;
      }

      console.log("Updating profile with data:", data);

      const result = await profileService.updateProfile(data);

      if (result.success) {
        updateUserProfile({
          fullName: data.fullName || user.fullName,
          userName: data.userName || user.userName || user.username,
          username: data.userName || user.userName || user.username,
          bio: data.bio || user.bio,
          website: data.website || user.website,
          profilePicture: data.profilePicture || user.profilePicture,
          gender: data.gender || user.gender,
        });

        console.log("Profile updated successfully");
        return true;
      } else {
        setError(result.message || "Failed to update profile");
        console.error("Profile update failed:", result.error);
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
      console.error("Profile update error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        setError("User not found");
        return null;
      }

      console.log("Uploading profile picture:", file.name);

      const result = await profileService.uploadProfilePicture(file);

      if (result.success && result.data?.url) {
        updateUserProfile({
          profilePicture: result.data.url,
        });

        console.log("Profile picture uploaded successfully");
        return result.data.url;
      } else {
        setError(result.message || "Failed to upload profile picture");
        console.error("Profile picture upload failed:", result.error);
        return null;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload profile picture";
      setError(errorMessage);
      console.error("Profile picture upload error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const removeProfilePicture = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        setError("User not found");
        return false;
      }

      console.log("Removing profile picture");

      const result = await profileService.removeProfilePicture();

      if (result.success) {
        const defaultImage =
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

        updateUserProfile({
          profilePicture: defaultImage,
        });

        console.log("Profile picture removed successfully");
        return true;
      } else {
        setError(result.message || "Failed to remove profile picture");
        console.error("Profile picture removal failed:", result.error);
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove profile picture";
      setError(errorMessage);
      console.error("Profile picture removal error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        setError("User not found");
        return false;
      }

      console.log("Refreshing profile data");

      const result = await profileService.getCurrentProfile();

      if (result.success && result.data?.user) {
        updateUserProfile(result.data.user);
        console.log("Profile refreshed successfully");
        return true;
      } else {
        setError(result.message || "Failed to refresh profile");
        console.error("Profile refresh failed:", result.error);
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to refresh profile";
      setError(errorMessage);
      console.error("Profile refresh error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    uploadProfilePicture,
    removeProfilePicture,
    refreshProfile,
    isLoading,
    error,
    clearError,
  };
};
