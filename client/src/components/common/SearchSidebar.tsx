/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search, Users, AlertCircle } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { userService, type ApiUser } from "../../services/api/userService";
import { useAuth } from "../../hooks/useAuth";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();

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

  // Fetch all users when sidebar opens
  useEffect(() => {
    if (isOpen && !hasSearched) {
      fetchAllUsers();
    }
  }, [isOpen, hasSearched, fetchAllUsers]);

  // Search debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchUsers]);

  // Close on click outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Filter out current logged-in user
  const displayUsers = useMemo(() => {
    const transformed = users.map((user) => userService.transformApiUser(user));
    return transformed.filter(
      (user) => user.username !== currentUser?.userName
    );
  }, [users, currentUser]);

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
        className={`fixed top-0 h-full bg-white z-50 transition-all duration-300 ease-out
          w-[30rem] shadow-lg rounded-r-xl
          ${
            isOpen
              ? "left-[5.5rem] translate-x-0 opacity-100"
              : "left-[5.5rem] -translate-x-full opacity-0 pointer-events-none"
          }
          border-l border-gray-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900">Search</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search Input */}
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

        {/* Results */}
        <div className="flex-1 overflow-y-auto bg-white px-6 pb-6">
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

          {/* Search results */}
          {showSearchResults && !isLoading && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Search Results ({displayUsers.length})
              </h3>
              {displayUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() =>
                    handleUserClick(users.find((u) => u._id === user.id)!)
                  }
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.displayName
                      )}&background=3b82f6&color=fff&size=40`;
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* All users when no search */}
          {!showSearchResults && !isLoading && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                All Users ({displayUsers.length})
              </h3>
              {displayUsers.slice(0, 20).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() =>
                    handleUserClick(users.find((u) => u._id === user.id)!)
                  }
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* No results */}
          {showNoResults && (
            <div className="text-center py-12">
              <Users className="w-8 h-8 mx-auto text-gray-400" />
              <p className="text-gray-500 text-sm">No users found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
