import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../user/UserCard/UserCard";
import { userService, type ApiUser } from "../../services/api/userService";
import { useAuth } from "../../hooks/useAuth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentUser = {
  username: "giftybabe",
  name: "Ngozi Uloka",
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
};

const SuggestedUsers: React.FC = () => {
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getAllUsers();

        if (response.success && (response.users || response.data)) {
          const users = response.users || response.data || [];

          const filtered = users.filter(
            (user) => user.userName !== currentUser.userName
          );

          const shuffled = filtered.sort(() => 0.5 - Math.random());
          setSuggestedUsers(shuffled.slice(0, 5));
        } else {
          setError(response.message || "Failed to fetch users");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error occurred");
        console.error("Error fetching suggested users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleUserFollow = (userId: string) => {
    console.log("Follow user:", userId);
  };

  const handleSwitchAccount = () => {
    console.log("Switch account");
  };

  const handleSeeAll = () => {
    console.log("See all suggested users");
    navigate("/search");
  };

  const handleUserClick = (user: ApiUser) => {
    navigate(`/user/${user.userName}`);
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
            <h3 className="font-semibold text-base">{currentUser.userName}</h3>
            <p className="text-gray-500 text-sm mt-1">{currentUser.fullName}</p>
          </div>
        </div>
        <button
          onClick={handleSwitchAccount}
          className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors px-3 py-2"
        >
          Switch
        </button>
      </div>

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
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-blue-500 text-sm hover:text-blue-600"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-6 px-2">
            {suggestedUsers.map((user) => {
              const transformedUser = userService.transformApiUser(user);
              return (
                <div
                  key={user._id}
                  className="py-2 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <UserCard
                    user={{
                      id: transformedUser.id,
                      username: transformedUser.username,
                      name: transformedUser.displayName,
                      avatar: transformedUser.avatar,
                      isVerified: false,
                    }}
                    onFollow={() => handleUserFollow(user._id)}
                    showFollowButton={true}
                    size="sm"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

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
