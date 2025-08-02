import React from "react";
import UserCard from "../user/UserCard/UserCard";

const mockSuggestedUsers = [
  {
    id: "1",
    username: "modupeandjames",
    name: "Followed by presh_george +...",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    isVerified: false,
  },
  {
    id: "2",
    username: "diaryofakitchenlover",
    name: "Followed by ezeh.kelvin 395...",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: "3",
    username: "chukwuemeka.emmanuel...",
    name: "Suggested for you",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    isVerified: false,
  },
  {
    id: "4",
    username: "okeke6619",
    name: "Following michelle_ubah",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    isVerified: false,
  },
  {
    id: "5",
    username: "tersugh_tyotule",
    name: "Suggested for you",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    isVerified: false,
  },
];

const currentUser = {
  username: "giftybabe",
  name: "Ngozi Uloka",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&h=56&fit=crop&crop=face",
};

const SuggestedUsers: React.FC = () => {
  const handleUserFollow = (userId: string) => {
    console.log("Follow user:", userId);
  };

  const handleSwitchAccount = () => {
    console.log("Switch account");
  };

  const handleSeeAll = () => {
    console.log("See all suggested users");
  };

  return (
    <div className="bg-transparent py-4 ml-[20%]">
      <div className="flex items-center justify-between mb-12 px-2">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-base">{currentUser.username}</h3>
            <p className="text-gray-500 text-sm mt-1">{currentUser.name}</p>
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

        <div className="space-y-6 px-2">
          {mockSuggestedUsers.map((user) => (
            <div key={user.id} className="py-2">
              <UserCard
                user={user}
                onFollow={() => handleUserFollow(user.id)}
                showFollowButton={true}
                size="sm"
              />
            </div>
          ))}
        </div>
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
