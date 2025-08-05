// File: src/components/search/MobileSearch.tsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { userService, type ApiUser } from "../../services/api/userService";

interface MobileSearchProps {
  onBack: () => void;
}

interface RecentSearch {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  timestamp: number;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchInputActive, setIsSearchInputActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const { users, isLoading, error, hasSearched, fetchAllUsers, searchUsers } =
    useSearch();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        setRecentSearches(parsed);
      } catch (error) {
        console.error("Error parsing recent searches:", error);
      }
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Fetch all users when search input becomes active
  useEffect(() => {
    if (isSearchInputActive && !hasSearched) {
      fetchAllUsers();
    }
  }, [isSearchInputActive, hasSearched, fetchAllUsers]);

  // Filter users when search query changes
  useEffect(() => {
    if (hasSearched) {
      searchUsers(searchQuery);
    }
  }, [searchQuery, hasSearched, searchUsers]);

  const handleSearchInputFocus = () => {
    setIsSearchInputActive(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
  };

  const handleUserClick = (user: ApiUser) => {
    // Transform the API user to the format needed for recent searches
    const transformedUser = userService.transformApiUser(user);

    // Add to recent searches
    const newSearch: RecentSearch = {
      id: transformedUser.id,
      username: transformedUser.username,
      displayName: transformedUser.displayName,
      avatar: transformedUser.avatar,
      timestamp: Date.now(),
    };

    setRecentSearches((prev) => {
      // Remove if already exists and add to front
      const filtered = prev.filter((search) => search.id !== newSearch.id);
      return [newSearch, ...filtered].slice(0, 10); // Keep only 10 recent searches
    });

    // Navigate to user profile (you can implement this based on your routing)
    console.log("Navigate to user:", transformedUser.username);
  };

  const handleRecentSearchClick = (search: RecentSearch) => {
    console.log("Navigate to recent search:", search.username);
  };

  const handleRemoveRecentSearch = (
    searchId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setRecentSearches((prev) =>
      prev.filter((search) => search.id !== searchId)
    );
  };

  // Show loading state
  if (isLoading && !hasSearched) {
    return (
      <div className="h-full bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none text-sm shadow-none"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleSearchInputFocus}
              className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-lg border-0 outline-none text-sm focus:bg-gray-50 focus:ring-0 shadow-none"
              style={{ boxShadow: "none" }}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Error State */}
        {error && (
          <div className="px-4 py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={fetchAllUsers}
                className="mt-2 text-red-600 text-sm font-medium hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Recent searches section - only show when search input is not active or no query */}
        {!isSearchInputActive && recentSearches.length > 0 && (
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Recent</h3>
              <button
                onClick={handleClearAllRecent}
                className="text-blue-500 text-sm font-medium hover:text-blue-600"
              >
                Clear all
              </button>
            </div>
            <div>
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={search.avatar}
                      alt={search.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {search.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {search.displayName}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleRemoveRecentSearch(search.id, e)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search results or all users */}
        {isSearchInputActive && hasSearched && (
          <>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </div>
            ) : users.length > 0 ? (
              <div className="px-4">
                <div className="py-2">
                  <p className="text-sm text-gray-500 mb-4">
                    {searchQuery
                      ? `${users.length} result${
                          users.length !== 1 ? "s" : ""
                        } for "${searchQuery}"`
                      : `${users.length} users`}
                  </p>
                </div>
                {users.map((user) => {
                  const transformedUser = userService.transformApiUser(user);
                  return (
                    <div
                      key={user._id}
                      className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={transformedUser.avatar}
                          alt={transformedUser.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-semibold text-sm text-gray-900 truncate">
                            {transformedUser.username}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {transformedUser.displayName}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? "No results found" : "No users found"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {searchQuery
                      ? "Try searching for something else"
                      : "There are no users to display"}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Initial state - not searched yet and no recent searches */}
        {!isSearchInputActive &&
          !hasSearched &&
          recentSearches.length === 0 && (
            <div className="flex-1 flex items-center justify-center px-4 py-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Search for users
                </h3>
                <p className="text-gray-500 text-sm">
                  Tap the search bar to find people
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default MobileSearch;
