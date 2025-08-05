import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export interface UpdateProfileData {
  fullName?: string;
  userName?: string;
  bio?: string;
  website?: string;
  profilePicture?: string;
  gender?: string;
}

interface UseProfileReturn {
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  uploadProfilePicture: (file: File) => Promise<string | null>;
  removeProfilePicture: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const useProfile = (): UseProfileReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUserProfile } = useAuthContext();

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!user) {
        setError("User not found");
        return false;
      }

      // Validate required fields
      if (data.fullName !== undefined && !data.fullName.trim()) {
        setError("Full name is required");
        return false;
      }

      if (data.userName !== undefined && !data.userName.trim()) {
        setError("Username is required");
        return false;
      }

      // Update the user in context and localStorage using the context method
      updateUserProfile({
        fullName: data.fullName || user.fullName,
        userName: data.userName || user.userName || user.username,
        bio: data.bio || user.bio,
        website: data.website || user.website,
        profilePicture: data.profilePicture || user.profilePicture,
        gender: data.gender || user.gender,
      });

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return null;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Please select an image smaller than 5MB");
        return null;
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        setError("User not found");
        return null;
      }

      // Create a local URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);

      // Update the user's profile picture using the context method
      updateUserProfile({
        profilePicture: imageUrl,
      });

      return imageUrl;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload profile picture";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const removeProfilePicture = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!user) {
        setError("User not found");
        return false;
      }

      // Set profile picture to default using the context method
      const defaultImage =
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

      updateUserProfile({
        profilePicture: defaultImage,
      });

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove profile picture";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    uploadProfilePicture,
    removeProfilePicture,
    isLoading,
    error,
  };
};
