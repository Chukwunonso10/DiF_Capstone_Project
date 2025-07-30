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
