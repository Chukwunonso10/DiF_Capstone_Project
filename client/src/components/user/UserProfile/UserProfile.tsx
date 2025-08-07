/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import { useUserProfile } from "../../../hooks/useUserProfile";

import Sidebar from "../../layout/Sidebar/Sidebar";
import ProfileHeader from "../../common/ProfileHeader";
import UserAvatar from "../../user/UserProfile/UserAvatar";
import ProfileStats from "../../user/UserProfile/ProfileStats";
import ProfileBio from "../../user/UserProfile/ProfileBio";
import StoryHighlights from "../../story/StoryHighlights";
import ProfileTabs from "../../common/ProfileTabs";
import PostsGrid from "../../common/PostsGrid";
import MobileBottomNav from "../../common/MobileBottomNav";
import ChangeProfilePhotoModal from "../../common/ChangeProfilePhotoModal";
import { useAuthContext } from "../../../context/AuthContext";

const defaultProfileImage =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();
  const { user, updateUserProfile } = useAuthContext();
  const currentUser = getCurrentUser();
  const username =
    user?.userName || user?.username || currentUser?.userName || "";

  const { userProfile, isLoading, error, refetch } = useUserProfile(username);

  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts"
  );
  const [showChangePhotoModal, setShowChangePhotoModal] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const userData = user || currentUser;
    const newImage = userData?.profilePicture || defaultProfileImage;
    setCurrentProfileImage((prev) => (prev !== newImage ? newImage : prev));
  }, [user?.profilePicture, currentUser?.profilePicture]);

  const handleBack = () => {
    console.log("Navigate back");
  };

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleSidebarItemClick = (item: string) => {
    console.log("Sidebar item clicked:", item);
    switch (item) {
      case "home":
        navigate("/");
        break;
      case "explore":
        navigate("/explore");
        break;
      case "search":
        navigate("/search");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "create":
        navigate("/create");
        break;
      case "edit-profile":
        navigate("/edit-profile");
        break;
      case "logout":
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
        break;
      default:
        console.log(`Navigation for ${item} not implemented`);
    }
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

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleProfileImageClick = () => {
    setShowChangePhotoModal(true);
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      setIsUpdating(true);
      const imageUrl = URL.createObjectURL(file);
      setCurrentProfileImage(imageUrl);
      updateUserProfile({ profilePicture: imageUrl });
      setShowChangePhotoModal(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoRemove = async () => {
    try {
      setIsUpdating(true);
      setCurrentProfileImage(defaultProfileImage);
      updateUserProfile({ profilePicture: defaultProfileImage });
      setShowChangePhotoModal(false);
    } catch (error) {
      console.error("Error removing photo:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading || isUpdating || !userProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Profile not found
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const displayUsername = userProfile.username;
  const displayFullName = userProfile.displayName;
  const displayBio = userProfile.bio || "";

  const safeProfileImage = currentProfileImage || defaultProfileImage;

  return (
    <div className="min-h-screen bg-white">
      <div className="lg:hidden">
        <div className="w-full bg-white min-h-screen">
          <ProfileHeader
            username={displayUsername}
            onBack={handleBack}
            onMenuClick={handleMenuClick}
            isDesktop={false}
          />

          <div className="px-4 py-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-shrink-0">
                <button onClick={handleProfileImageClick} className="block">
                  <UserAvatar
                    src={safeProfileImage}
                    alt={displayUsername}
                    size="lg"
                  />
                </button>
              </div>

              <div className="flex-1 ml-6">
                <div className="mb-4">
                  <ProfileStats
                    postsCount={userProfile.postsCount}
                    followersCount={userProfile.followersCount}
                    followingCount={userProfile.followingCount}
                    layout="horizontal"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleEditProfile}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Edit profile
                  </button>
                  <button className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition-colors">
                    View archive
                  </button>
                </div>
              </div>
            </div>

            <ProfileBio displayName={displayFullName} bio={displayBio} />

            <StoryHighlights
              highlights={userProfile.highlights}
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
              posts={userProfile.posts}
              onPostClick={handlePostClick}
            />
          </div>

          <MobileBottomNav
            activeItem="profile"
            onItemClick={handleSidebarItemClick}
            userAvatar={safeProfileImage}
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
          userAvatar={safeProfileImage}
        />

        <div className="transition-all duration-300 ease-out ml-80">
          <div className="max-w-5xl mx-auto">
            <div className="px-8 py-12">
              <div className="flex items-start gap-12 mb-12">
                <div className="flex-shrink-0">
                  <button onClick={handleProfileImageClick} className="block">
                    <UserAvatar
                      src={safeProfileImage}
                      alt={displayUsername}
                      size="xl"
                      className="w-40 h-40"
                    />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-8">
                    <h1 className="text-2xl font-light">{displayUsername}</h1>
                    <button
                      onClick={handleEditProfile}
                      className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
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
                      postsCount={userProfile.postsCount}
                      followersCount={userProfile.followersCount}
                      followingCount={userProfile.followingCount}
                      layout="vertical"
                    />
                  </div>

                  <ProfileBio displayName={displayFullName} bio={displayBio} />
                </div>
              </div>

              <div className="mb-8">
                <StoryHighlights
                  highlights={userProfile.highlights}
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
                posts={userProfile.posts}
                onPostClick={handlePostClick}
              />
            </div>
          </div>
        </div>
      </div>

      <ChangeProfilePhotoModal
        isOpen={showChangePhotoModal}
        onClose={() => setShowChangePhotoModal(false)}
        onUpload={handlePhotoUpload}
        onRemove={handlePhotoRemove}
        hasCurrentPhoto={safeProfileImage !== defaultProfileImage}
      />
    </div>
  );
};

export default UserProfile;
