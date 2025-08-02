import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Search, Users, AlertCircle, X } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { userService, type ApiUser } from "../../services/api/userService";

interface MobileSearchProps {
  onBack: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    users,
    isLoading,
    error,
    hasSearched,
    recentSearches,
    fetchAllUsers,
    searchUsers,
    addToRecentSearches,
    removeRecentSearch,
    clearRecentSearches,
  } = useSearch();

  useEffect(() => {
    if (!hasSearched) {
      fetchAllUsers();
    }
  }, [hasSearched, fetchAllUsers]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchUsers]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearAll = () => {
    clearRecentSearches();
  };

  const handleUserClick = (user: ApiUser) => {
    addToRecentSearches(user);
    console.log("Navigate to user:", user.userName);
    // TODO: Navigate to user profile
    onBack();
  };

  const handleRecentSearchClick = (search: (typeof recentSearches)[0]) => {
    console.log("Navigate to recent search:", search.username);
    // TODO: Navigate to user profile
    onBack();
  };

  const displayUsers = useMemo(() => {
    return users.map((user) => userService.transformApiUser(user));
  }, [users]);

  const showSearchResults = searchQuery.trim().length > 0;
  const showRecentSearches = !showSearchResults && recentSearches.length > 0;
  const showAllUsers =
    !showSearchResults &&
    !showRecentSearches &&
    hasSearched &&
    displayUsers.length > 0;
  const showNoResults =
    showSearchResults && displayUsers.length === 0 && !isLoading;

  return (
    <div className="h-full bg-white">
      <div className="h-11 bg-white flex items-center justify-between px-6 text-black font-medium">
        <div className="text-sm font-semibold">9:41</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="currentColor">
            <path d="M1 3h14v6H1z" />
            <path
              d="M0 2h16v8H0z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <div className="w-6 h-3 border border-black rounded-sm bg-black"></div>
        </div>
      </div>

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
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {error && (
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Error loading users
                </p>
                <p className="text-xs text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-gray-600">Loading users...</p>
          </div>
        )}

        {showRecentSearches && (
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Recent</h3>
              <button
                onClick={handleClearAll}
                className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-1">
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors group"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={search.avatar}
                      alt={search.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          search.displayName
                        )}&background=3b82f6&color=fff&size=40`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-semibold text-sm text-gray-900 truncate">
                        {search.username}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {search.displayName}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(search.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded-full transition-all duration-200"
                    aria-label="Remove search"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showSearchResults && !isLoading && displayUsers.length > 0 && (
          <div className="px-4 py-4">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Search Results ({displayUsers.length})
            </h3>
            <div className="space-y-1">
              {displayUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
                  onClick={() =>
                    handleUserClick(users.find((u) => u._id === user.id)!)
                  }
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.displayName
                        )}&background=3b82f6&color=fff&size=40`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-semibold text-sm text-gray-900 truncate">
                        {user.username}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {user.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAllUsers && (
          <div className="px-4 py-4">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              All Users ({displayUsers.length})
            </h3>
            <div className="space-y-1">
              {displayUsers.slice(0, 50).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
                  onClick={() =>
                    handleUserClick(users.find((u) => u._id === user.id)!)
                  }
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.displayName
                        )}&background=3b82f6&color=fff&size=40`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-semibold text-sm text-gray-900 truncate">
                        {user.username}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {user.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showNoResults && (
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-500 text-sm">
                Try searching with a different term
              </p>
            </div>
          </div>
        )}

        {!showSearchResults &&
          !showRecentSearches &&
          !showAllUsers &&
          !isLoading &&
          hasSearched && (
            <div className="flex-1 flex items-center justify-center px-4 py-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No users available
                </h3>
                <p className="text-gray-500 text-sm">
                  Check your connection and try again
                </p>
              </div>
            </div>
          )}

        {!hasSearched && !isLoading && (
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Search for users
              </h3>
              <p className="text-gray-500 text-sm">
                Find and connect with other users
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="pb-2 flex justify-center bg-white">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default MobileSearch;
