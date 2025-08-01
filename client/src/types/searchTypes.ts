export interface SearchUser {
  id: string;
  username: string;
  displayName: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  avatar: string;
  verified?: boolean;
  followers?: string;
  bio?: string;
}

export interface RecentSearch {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  timestamp: number;
}

export interface SearchState {
  users: SearchUser[];
  filteredUsers: SearchUser[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export interface SearchFilters {
  query: string;
  verified?: boolean;
  hasEmail?: boolean;
}

export interface ApiSearchUser {
  _id: string;
  fullName: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  bio?: string;
  profilePicture?: string;
  verified?: boolean;
  followersCount?: number;
  followingCount?: number;
}

export interface SearchApiResponse {
  success: boolean;
  message: string;
  data?: ApiSearchUser[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
