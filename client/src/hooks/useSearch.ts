import { useState, useCallback } from "react";
import { userService, type ApiUser } from "../services/api/userService";

interface SearchState {
  users: ApiUser[];
  filteredUsers: ApiUser[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

interface RecentSearch {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  timestamp: number;
}

const MAX_RECENT_SEARCHES = 10;

export const useSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    users: [],
    filteredUsers: [],
    isLoading: false,
    error: null,
    hasSearched: false,
  });

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const fetchAllUsers = useCallback(async () => {
    setSearchState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await userService.getAllUsers();

      if (response.success && (response.users || response.data)) {
        const usersData = response.users || response.data || [];

        setSearchState((prev) => ({
          ...prev,
          users: usersData,
          filteredUsers: usersData,
          isLoading: false,
          hasSearched: true,
        }));
      } else {
        setSearchState((prev) => ({
          ...prev,
          error: response.message || "Failed to fetch users",
          isLoading: false,
        }));
      }
    } catch (error) {
      setSearchState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Network error occurred",
        isLoading: false,
      }));
    }
  }, []);

  const searchUsers = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchState((prev) => ({
          ...prev,
          filteredUsers: prev.users,
        }));
        return;
      }

      const filtered = userService.filterUsers(searchState.users, query);
      setSearchState((prev) => ({
        ...prev,
        filteredUsers: filtered,
      }));
    },
    [searchState.users]
  );

  const addToRecentSearches = useCallback((user: ApiUser) => {
    const transformedUser = userService.transformApiUser(user);

    const newSearch: RecentSearch = {
      id: transformedUser.id,
      username: transformedUser.username,
      displayName: transformedUser.displayName,
      avatar: transformedUser.avatar,
      timestamp: Date.now(),
    };

    setRecentSearches((prev) => {
      const updatedSearches = [
        newSearch,
        ...prev.filter((search) => search.id !== newSearch.id),
      ].slice(0, MAX_RECENT_SEARCHES);

      return updatedSearches;
    });
  }, []);

  const removeRecentSearch = useCallback((searchId: string) => {
    setRecentSearches((prev) =>
      prev.filter((search) => search.id !== searchId)
    );
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchState({
      users: [],
      filteredUsers: [],
      isLoading: false,
      error: null,
      hasSearched: false,
    });
    setRecentSearches([]);
  }, []);

  return {
    users: searchState.filteredUsers,
    allUsers: searchState.users,
    isLoading: searchState.isLoading,
    error: searchState.error,
    hasSearched: searchState.hasSearched,

    recentSearches,

    fetchAllUsers,
    searchUsers,
    addToRecentSearches,
    removeRecentSearch,
    clearRecentSearches,
    resetSearch,
  };
};
