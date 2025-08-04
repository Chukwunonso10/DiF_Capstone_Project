export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  website?: string;
  isFollowing?: boolean;
  isOwnProfile: boolean;
}

export interface OtherUserProfile {
  id: string;
  username: string;
  displayName: string;
  fullName: string;
  bio?: string;
  avatar: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  website?: string;
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

export interface ProfileHighlight {
  id: number;
  name: string;
  image: string;
  isNew?: boolean;
  storyCount?: number;
}

export interface ProfilePost {
  id: number;
  image: string;
  type: "image" | "video" | "carousel";
  likesCount?: number;
  commentsCount?: number;
}

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export interface FollowAction {
  userId: string;
  isFollowing: boolean;
}

export interface UserInteraction {
  userId: string;
  type: "follow" | "unfollow" | "message" | "block" | "report";
  timestamp: number;
}
