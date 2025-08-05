import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search, Users, AlertCircle } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { userService, type ApiUser } from "../../services/api/userService";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
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
    if (isOpen && !hasSearched) {
      fetchAllUsers();
    }
  }, [isOpen, hasSearched, fetchAllUsers]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchUsers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const searchSidebar = document.getElementById("search-sidebar");
      const mainSidebar = document.querySelector("aside");

      if (
        isOpen &&
        searchSidebar &&
        !searchSidebar.contains(target) &&
        !mainSidebar?.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleUserClick = (user: ApiUser) => {
    addToRecentSearches(user);

    navigate(`/user/${user.userName}`);
    onClose();
  };

  const handleRecentSearchClick = (search: (typeof recentSearches)[0]) => {
    navigate(`/user/${search.username}`);
    onClose();
  };

  const displayUsers = useMemo(() => {
    return users.map((user) => userService.transformApiUser(user));
  }, [users]);

  const showSearchResults = searchQuery.trim().length > 0;
  const showRecentSearches = !showSearchResults && recentSearches.length > 0;
  const showNoResults =
    showSearchResults && displayUsers.length === 0 && !isLoading;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 lg:hidden ${
          isOpen ? "bg-opacity-50 visible" : "bg-opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        id="search-sidebar"
        className={`
          fixed top-0 h-full bg-white z-50 transition-all duration-300 ease-out
          w-[30rem] shadow-lg rounded-r-xl
          ${
            isOpen
              ? "left-[5.5rem] translate-x-0 opacity-100"
              : "left-[5.5rem] -translate-x-full opacity-0 pointer-events-none"
          }
          border-l border-gray-200
        `}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900">Search</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
            aria-label="Close search"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8 bg-white">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm placeholder-gray-500"
              autoFocus={isOpen}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="px-6 pb-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Error loading users
                  </p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600">Loading users...</p>
              </div>
            )}

            {showSearchResults && !isLoading && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Search Results ({displayUsers.length})
                </h3>
                {displayUsers.length > 0 ? (
                  <div className="space-y-2">
                    {displayUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-all duration-200"
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
                          <div className="flex items-center gap-2">
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
                ) : null}
              </div>
            )}

            {showNoResults && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No users found</p>
                <p className="text-gray-400 text-xs mt-1">
                  Try searching with a different term
                </p>
              </div>
            )}

            {showRecentSearches && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-all duration-200"
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
                        <div className="flex items-center gap-2">
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

            {!showSearchResults &&
              !showRecentSearches &&
              !isLoading &&
              hasSearched && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    All Users ({displayUsers.length})
                  </h3>
                  <div className="space-y-2">
                    {displayUsers.slice(0, 20).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-all duration-200"
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
                          <div className="flex items-center gap-2">
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

            {!isLoading &&
              hasSearched &&
              displayUsers.length === 0 &&
              !showSearchResults && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No users available</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Check your connection and try again
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
