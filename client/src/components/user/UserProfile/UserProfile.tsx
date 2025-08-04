import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

import Sidebar from "../../layout/Sidebar/Sidebar";
import ProfileHeader from "../../common/ProfileHeader";
import UserAvatar from "../../user/UserProfile/UserAvatar";
import ProfileStats from "../../user/UserProfile/ProfileStats";
import ProfileBio from "../../user/UserProfile/ProfileBio";
import StoryHighlights from "../../story/StoryHighlights";
import ProfileTabs from "../../common/ProfileTabs";
import PostsGrid from "../../common/PostsGrid";
import MobileBottomNav from "../../common/MobileBottomNav";

// import profileImage from "../../../assets/images/profileImage.png";
const profileImage =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
const mockUserData = {
  username: "jacob_w",
  displayName: "Jacob West",
  bio: "Digital goodies designer @pixsellz \nEverything is designed.",
  postsCount: 147,
  followersCount: 4541,
  followingCount: 304,
  isVerified: false,
  isFollowing: false,
  profileImage: profileImage,
  posts: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      isVideo: false,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1551834369-8d3364b21848?w=400&h=400&fit=crop",
      isVideo: true,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop",
      isVideo: false,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
      isVideo: false,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&h=400&fit=crop",
      isVideo: false,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=400&h=400&fit=crop",
      isVideo: true,
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
      isVideo: false,
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=400&h=400&fit=crop",
      isVideo: false,
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=400&h=400&fit=crop",
      isVideo: false,
    },
  ],
  highlights: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&h=80&fit=crop",
      title: "Travel",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=80&h=80&fit=crop",
      title: "Food",
    },
  ],
};

const UserProfile = () => {
  //Fetch user from the useAuth hook
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();

  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts"
  );
  const [isFollowing, setIsFollowing] = useState(mockUserData.isFollowing);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleBack = () => {
    console.log("Navigate back");
  };

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleSidebarItemClick = (item: string) => {
    console.log("Sidebar item clicked:", item);
  };

  const handlePostClick = (post: unknown) => {
    console.log("Post clicked:", post);
  };

  const handleHighlightClick = (highlight: unknown) => {
    console.log("Highlight clicked:", highlight);
  };

  const handleAddHighlight = () => {
    console.log("Add new highlight");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="lg:hidden">
        <div className="w-full bg-white min-h-screen">
          <ProfileHeader
            username={currentUser.userName}
            onBack={handleBack}
            onMenuClick={handleMenuClick}
            isDesktop={false}
          />

          <div className="px-4 py-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-shrink-0">
                <UserAvatar
                  src={currentUser.profilePicture || profileImage}
                  alt={currentUser.userName}
                  size="lg"
                />
              </div>

              <div className="flex-1 ml-6">
                <div className="mb-4">
                  <ProfileStats
                    postsCount={mockUserData.postsCount}
                    followersCount={mockUserData.followersCount}
                    followingCount={mockUserData.followingCount}
                    layout="horizontal"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleFollowClick}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                      isFollowing
                        ? "bg-gray-200 text-black hover:bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <ProfileBio
              displayName={currentUser.fullName}
              bio={currentUser.bio}
            />

            <StoryHighlights
              highlights={mockUserData.highlights}
              canAddNew={true}
              onHighlightClick={handleHighlightClick}
              onAddNew={handleAddHighlight}
            />
          </div>

          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showLabels={false}
          />

          <div className="px-0">
            <PostsGrid
              posts={mockUserData.posts}
              onPostClick={handlePostClick}
            />
          </div>

          <MobileBottomNav
            activeItem="profile"
            onItemClick={handleSidebarItemClick}
            userAvatar={currentUser.profilePicture || profileImage}
          />

          <div className="pb-2 flex justify-center">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative">
        <Sidebar
          activeItem="profile"
          onItemClick={handleSidebarItemClick}
          userAvatar={currentUser.profilePicture || profileImage}
        />

        <div className="transition-all duration-300 ease-out ml-80">
          <div className="max-w-5xl mx-auto">
            <div className="px-8 py-12">
              <div className="flex items-start gap-12 mb-12">
                <div className="flex-shrink-0">
                  <UserAvatar
                    src={currentUser.profilePicture || profileImage}
                    alt={currentUser.username}
                    size="xl"
                    className="w-40 h-40"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-8">
                    <h1 className="text-2xl font-light">
                      {currentUser.userName}
                    </h1>
                    <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                      Edit profile
                    </button>
                    <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                      View archive
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>

                  <div className="mb-8">
                    <ProfileStats
                      postsCount={mockUserData.postsCount}
                      followersCount={mockUserData.followersCount}
                      followingCount={mockUserData.followingCount}
                      layout="vertical"
                    />
                  </div>

                  <ProfileBio
                    displayName={currentUser.fullName}
                    bio={currentUser.bio}
                  />
                </div>
              </div>

              <div className="mb-8">
                <StoryHighlights
                  highlights={mockUserData.highlights}
                  canAddNew={true}
                  onHighlightClick={handleHighlightClick}
                  onAddNew={handleAddHighlight}
                />
              </div>
            </div>

            <div className="border-t border-gray-200">
              <ProfileTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                showLabels={false}
              />
            </div>

            <div className="px-8">
              <PostsGrid
                posts={mockUserData.posts}
                onPostClick={handlePostClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
