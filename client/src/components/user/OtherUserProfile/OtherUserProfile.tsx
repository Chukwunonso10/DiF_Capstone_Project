import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../UserProfile/UserAvatar";
import ProfileBio from "../UserProfile/ProfileBio";
import StoryHighlights from "../../story/StoryHighlights";
import ProfileTabs from "../../common/ProfileTabs";
import PostsGrid from "../../common/PostsGrid";
import OtherUserHeader from "./OtherUserHeader";
import OtherUserStats from "./OtherUserStats";
import OtherUserActions from "./OtherUserActions";
import MobileBottomNav from "../../common/MobileBottomNav";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { type UserProfileData } from "../../../hooks/useUserProfile";

interface OtherUserProfileProps {
  userProfile: UserProfileData;
  onFollowUser: () => void;
  currentUserAvatar?: string;
}

const OtherUserProfile: React.FC<OtherUserProfileProps> = ({
  userProfile,
  onFollowUser,
  currentUserAvatar,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts"
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleMenuClick = () => {
    console.log("Menu clicked for user:", userProfile.username);
  };

  const handleSidebarItemClick = (item: string) => {
    if (item === "logout") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      console.log("Sidebar item clicked:", item);
    }
  };

  const handlePostClick = (post: unknown) => {
    console.log("Post clicked:", post);
  };

  const handleHighlightClick = (highlight: unknown) => {
    console.log("Highlight clicked:", highlight);
  };

  const handleMessageUser = () => {
    console.log("Message user:", userProfile.username);
    // TODO: Navigate to messages or open message modal
  };

  const handleFollowersClick = () => {
    console.log("Show followers for:", userProfile.username);
    // TODO: Navigate to followers list
  };

  const handleFollowingClick = () => {
    console.log("Show following for:", userProfile.username);
    // TODO: Navigate to following list
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="w-full bg-white min-h-screen">
          <OtherUserHeader
            username={userProfile.username}
            postsCount={userProfile.postsCount}
            onBack={handleBack}
            onMore={handleMenuClick}
            isDesktop={false}
          />

          <div className="px-4 py-6">
            {/* Mobile Profile Info */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-shrink-0">
                <UserAvatar
                  src={userProfile.avatar}
                  alt={userProfile.username}
                  size="lg"
                />
              </div>

              <div className="flex-1 ml-6">
                <div className="mb-4">
                  <OtherUserStats
                    postsCount={userProfile.postsCount}
                    followersCount={userProfile.followersCount}
                    followingCount={userProfile.followingCount}
                    layout="horizontal"
                    onFollowersClick={handleFollowersClick}
                    onFollowingClick={handleFollowingClick}
                  />
                </div>

                <OtherUserActions
                  isFollowing={userProfile.isFollowing}
                  onFollow={onFollowUser}
                  onMessage={handleMessageUser}
                  onMore={handleMenuClick}
                />
              </div>
            </div>

            <ProfileBio
              displayName={userProfile.displayName}
              bio={userProfile.bio ?? "No bio yet"}
            />

            {userProfile.highlights.length > 0 && (
              <StoryHighlights
                highlights={userProfile.highlights}
                canAddNew={false}
                onHighlightClick={handleHighlightClick}
              />
            )}
          </div>

          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showLabels={false}
          />

          <div className="px-0">
            <PostsGrid
              posts={userProfile.posts}
              onPostClick={handlePostClick}
            />
          </div>

          <MobileBottomNav
            activeItem=""
            onItemClick={handleSidebarItemClick}
            userAvatar={currentUserAvatar}
          />

          <div className="pb-2 flex justify-center">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative">
        <Sidebar
          activeItem=""
          onItemClick={handleSidebarItemClick}
          userAvatar={currentUserAvatar}
        />

        <div className="transition-all duration-300 ease-out ml-80">
          <div className="max-w-5xl mx-auto">
            <div className="px-8 py-12">
              {/* Desktop Profile Header */}
              <div className="flex items-start gap-12 mb-12">
                <div className="flex-shrink-0">
                  <UserAvatar
                    src={userProfile.avatar}
                    alt={userProfile.username}
                    size="xl"
                    className="w-40 h-40"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-8">
                    <h1 className="text-2xl font-light flex items-center gap-2">
                      {userProfile.username}
                      {userProfile.isVerified && (
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.248.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </h1>

                    <OtherUserActions
                      isFollowing={userProfile.isFollowing}
                      onFollow={onFollowUser}
                      onMessage={handleMessageUser}
                      onMore={handleMenuClick}
                    />
                  </div>

                  <div className="mb-8">
                    <OtherUserStats
                      postsCount={userProfile.postsCount}
                      followersCount={userProfile.followersCount}
                      followingCount={userProfile.followingCount}
                      layout="vertical"
                      onFollowersClick={handleFollowersClick}
                      onFollowingClick={handleFollowingClick}
                    />
                  </div>
                  <ProfileBio
                    displayName={userProfile.displayName}
                    bio={userProfile.bio ?? "No bio yet"}
                  />
                </div>
              </div>

              {userProfile.highlights.length > 0 && (
                <div className="mb-8">
                  <StoryHighlights
                    highlights={userProfile.highlights}
                    canAddNew={false}
                    onHighlightClick={handleHighlightClick}
                  />
                </div>
              )}
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
                posts={userProfile.posts}
                onPostClick={handlePostClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
