/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../user/UserCard/UserCard";
import { userService, type ApiUser } from "../../services/api/userService";
import { useAuth } from "../../hooks/useAuth";

const SuggestedUsers: React.FC = () => {
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const fetchingRef = useRef(false);

  const fetchSuggestedUsers = useCallback(async () => {
    if (fetchingRef.current || hasFetched) {
      console.log("Skipping fetch - already fetching or fetched");
      return;
    }

    try {
      fetchingRef.current = true;
      setIsLoading(true);
      setError(null);

      // Check if user is authenticated
      if (!userService.isAuthenticated()) {
        setError("Please log in to view suggested users");
        navigate("/login");
        return;
      }

      console.log("Fetching suggested users...");

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await userService.getAllUsers();
      console.log("getAllUsers response:", response);

      if (response.success && (response.users || response.data)) {
        const users = response.users || response.data || [];
        console.log("Users received:", users);
        console.log("Current user:", currentUser);

        const filtered = users.filter(
          (user) => user.userName !== currentUser?.userName
        );
        console.log("Filtered users:", filtered);

        // Shuffle and take first 5
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const finalUsers = shuffled.slice(0, 5);
        console.log("Final suggested users:", finalUsers);
        setSuggestedUsers(finalUsers);
        setHasFetched(true);
      } else {
        console.error("API response error:", response);
        setError(response.message || "Failed to fetch users");

        // If it's an auth error, redirect to login
        if (
          response.message?.toLowerCase().includes("unauthorized") ||
          response.message?.toLowerCase().includes("authentication")
        ) {
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Error fetching suggested users:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Network error occurred";
      setError(errorMessage);

      // If it's an auth error, redirect to login
      if (
        errorMessage.toLowerCase().includes("unauthorized") ||
        errorMessage.toLowerCase().includes("authentication")
      ) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, [currentUser?.userName, navigate, hasFetched]);

  useEffect(() => {
    // Only fetch once when component mounts
    if (!hasFetched && !isLoading) {
      fetchSuggestedUsers();
    }
  }, [fetchSuggestedUsers, hasFetched, isLoading]);

  const handleUserFollow = (userId: string) => {
    console.log("Follow user:", userId);
    // Implement follow functionality
  };

  const handleSwitchAccount = () => {
    console.log("Switch account");
    // Implement account switching
  };

  const handleSeeAll = () => {
    console.log("See all suggested users");
    navigate("/search");
  };

  const handleUserClick = (user: ApiUser) => {
    navigate(`/user/${user.userName}`);
  };

  const handleRetry = () => {
    setHasFetched(false);
    setError(null);
    setSuggestedUsers([]);
    fetchSuggestedUsers();
  };

  if (isLoading) {
    return (
      <div className="bg-transparent py-4 ml-[20%]">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent py-4 ml-[20%]">
      {/* Current User Section */}
      {currentUser && (
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center space-x-4">
            <img
              src={
                currentUser.profilePicture ||
                `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541`
              }
              alt={currentUser.username}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-base">
                {currentUser.userName}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {currentUser.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={handleSwitchAccount}
            className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors px-3 py-2"
          >
            Switch
          </button>
        </div>
      )}

      {/* Suggested Users Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-gray-500 font-semibold text-base">
            Suggested for you
          </h2>
          <button
            onClick={handleSeeAll}
            className="text-sm font-semibold hover:text-gray-600 transition-colors px-3 py-2"
          >
            See All
          </button>
        </div>

        {error ? (
          <div className="px-2 py-4 text-center">
            <p className="text-red-500 text-sm mb-2">{error}</p>
            <button
              onClick={handleRetry}
              className="text-blue-500 text-sm hover:text-blue-600 px-3 py-1 border border-blue-500 rounded transition-colors"
            >
              Try again
            </button>
          </div>
        ) : suggestedUsers.length === 0 ? (
          <div className="px-2 py-4 text-center">
            <p className="text-gray-500 text-sm">
              No suggested users available
            </p>
          </div>
        ) : (
          <div className="space-y-6 px-2">
            {suggestedUsers.map((user) => {
              const transformedUser = userService.transformApiUser(user);
              console.log("Rendering user:", user);
              console.log("Transformed user:", transformedUser);

              return (
                <div
                  key={user._id}
                  className="py-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={transformedUser.avatar}
                        alt={transformedUser.username}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          console.log(
                            "Image load error for user:",
                            transformedUser.username
                          );
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
                        }}
                      />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">
                          {transformedUser.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transformedUser.displayName}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserFollow(user._id);
                      }}
                      className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors px-3 py-1"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="text-sm text-gray-400 leading-relaxed px-2 py-2">
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            About
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Help
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Press
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            API
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Jobs
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Privacy
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Terms
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Locations
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Language
          </span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors py-1">
            Meta Verified
          </span>
        </div>
        <div className="py-2">
          <p>© 2025 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestedUsers;
