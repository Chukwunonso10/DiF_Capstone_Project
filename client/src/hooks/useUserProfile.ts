/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { userService, type ApiUser } from "../services/api/userService";
import { useAuthContext } from "../context/AuthContext";

export interface UserProfileData {
  id: string;
  username: string;
  displayName: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  avatar: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  isFollowing: boolean;
  posts: Array<{
    id: string;
    image: string;
    isVideo?: boolean;
    isMultiple?: boolean;
  }>;
  highlights: Array<{
    id: string;
    image: string;
    title: string;
  }>;
}

interface UseUserProfileReturn {
  userProfile: UserProfileData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserProfile = (username: string): UseUserProfileReturn => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAuthContext();

  const fetchUserProfile = async () => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await userService.getUserByIdentifier(username);
      console.log("Original Response: ", response.data);

      if (response.success && response.data) {
        const apiUser = response.data;
        const transformedUser = userService.transformApiUser(apiUser);

        // Mock data for posts and additional profile info
        // In a real app, you'd fetch this from separate endpoints
        const mockPosts = [
          {
            id: "1",
            image:
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
            isVideo: false,
          },
          {
            id: "2",
            image:
              "https://images.unsplash.com/photo-1551834369-8d3364b21848?w=400&h=400&fit=crop",
            isVideo: true,
          },
          {
            id: "3",
            image:
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop",
            isVideo: false,
          },
          {
            id: "4",
            image:
              "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
            isVideo: false,
          },
          {
            id: "5",
            image:
              "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&h=400&fit=crop",
            isVideo: false,
          },
          {
            id: "6",
            image:
              "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=400&h=400&fit=crop",
            isVideo: true,
          },
        ];

        const mockHighlights = [
          {
            id: "1",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&h=80&fit=crop",
            title: "Travel",
          },
          {
            id: "2",
            image:
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=80&h=80&fit=crop",
            title: "Food",
          },
        ];

        const profileData: UserProfileData = {
          id: transformedUser.id,
          username: transformedUser.username,
          displayName: transformedUser.displayName,
          fullName: transformedUser.fullName,
          email: transformedUser.email,
          phoneNumber: transformedUser.phoneNumber,
          avatar: transformedUser.avatar,
          bio: transformedUser.bio || "No Bio",
          postsCount: mockPosts.length,
          followersCount: apiUser.followers?.length || 0,
          followingCount: apiUser.following?.length || 0,
          isVerified: Math.random() > 0.7,
          isPrivate: false,
          isFollowing: currentUser?.id
            ? apiUser.followers?.includes(currentUser.id) ?? false
            : false,

          posts: mockPosts,
          highlights: mockHighlights,
        };

        setUserProfile(profileData);
      } else {
        console.log("Error fetch: ", response);
        setError(response.message || "Failed to fetch user profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error occurred");
      console.error("Error fetching user profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [username, currentUser?.id]);

  const refetch = () => {
    fetchUserProfile();
  };

  return {
    userProfile,
    isLoading,
    error,
    refetch,
  };
};
