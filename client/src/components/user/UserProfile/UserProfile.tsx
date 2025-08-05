import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import ChangeProfilePhotoModal from "../../common/ChangeProfilePhotoModal";
import { useAuthContext } from "../../../context/AuthContext";

const defaultProfileImage =
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
  profileImage: defaultProfileImage,
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
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();
  const { user, updateUserProfile } = useAuthContext();
  const currentUser = getCurrentUser();

  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts"
  );
  const [isFollowing, setIsFollowing] = useState(mockUserData.isFollowing);
  const [showChangePhotoModal, setShowChangePhotoModal] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const [, setIsLoading] = useState(false);

  // Fixed useEffect to prevent infinite loops
  useEffect(() => {
    const userData = user || currentUser;
    const newImage = userData?.profilePicture || defaultProfileImage;

    // Only update if the image has actually changed
    setCurrentProfileImage((prev) => (prev !== newImage ? newImage : prev));
  }, [user?.profilePicture, currentUser?.profilePicture]); // Only depend on profilePicture

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // Handle navigation from sidebar
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
      setIsLoading(true);

      // Create a local URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setCurrentProfileImage(imageUrl);

      // Update the user profile in context immediately
      updateUserProfile({
        profilePicture: imageUrl,
      });

      setShowChangePhotoModal(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoRemove = async () => {
    try {
      setIsLoading(true);

      // Set to default image
      setCurrentProfileImage(defaultProfileImage);

      // Update the user profile in context immediately
      updateUserProfile({
        profilePicture: defaultProfileImage,
      });

      setShowChangePhotoModal(false);
    } catch (error) {
      console.error("Error removing photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayUsername =
    user?.userName ||
    user?.username ||
    currentUser?.userName ||
    currentUser?.username ||
    "";

  const displayFullName = user?.fullName || currentUser?.fullName || "";
  const displayBio = user?.bio || currentUser?.bio || "";

  // Ensure currentProfileImage is never empty
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
                    postsCount={mockUserData.postsCount}
                    followersCount={mockUserData.followersCount}
                    followingCount={mockUserData.followingCount}
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
                      postsCount={mockUserData.postsCount}
                      followersCount={mockUserData.followersCount}
                      followingCount={mockUserData.followingCount}
                      layout="vertical"
                    />
                  </div>

                  <ProfileBio displayName={displayFullName} bio={displayBio} />
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

      {/* Change Photo Modal */}
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
