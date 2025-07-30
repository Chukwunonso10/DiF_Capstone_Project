import React from "react";
import Layout from "../../components/layout/Layout/Layout";
import ProfileHeader from "../../components/user/UserProfile/ProfileHeader";
import ProfileStats from "../../components/user/UserProfile/ProfileStats";
import ProfileInfo from "../../components/user/UserProfile/ProfileInfo";
import ProfileHighlights from "../../components/user/UserProfile/ProfileHighlights";
import ProfileTabs from "../../components/user/UserProfile/ProfileTabs";
import ProfileGrid from "../../components/user/UserProfile/ProfileGrid";
import { useParams } from "react-router-dom";
import type { ProfilePost } from "../../types/profile";

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const currentUsername = username || "jacob_w";

  const userProfile = {
    username: currentUsername,
    displayName: "Jacob West",
    bio: "Digital goodies designer @pixsellz\nEverything is designed.",
    avatar: "/api/placeholder/150/150",
    postsCount: 54,
    followersCount: 834,
    followingCount: 162,
    isOwnProfile: true,
    highlights: [
      { id: 1, name: "New", image: "/api/placeholder/70/70", isNew: true },
      { id: 2, name: "Friends", image: "/api/placeholder/70/70" },
      { id: 3, name: "Sport", image: "/api/placeholder/70/70" },
      { id: 4, name: "Design", image: "/api/placeholder/70/70" },
    ],
    posts: [
      { id: 1, image: "/api/placeholder/400/400", type: "image" },
      { id: 2, image: "/api/placeholder/400/400", type: "image" },
      { id: 3, image: "/api/placeholder/400/400", type: "image" },
      { id: 4, image: "/api/placeholder/400/400", type: "image" },
      { id: 5, image: "/api/placeholder/400/400", type: "video" },
      { id: 6, image: "/api/placeholder/400/400", type: "image" },
      { id: 7, image: "/api/placeholder/400/400", type: "image" },
      { id: 8, image: "/api/placeholder/400/400", type: "image" },
      { id: 9, image: "/api/placeholder/400/400", type: "image" },
    ] as ProfilePost[],
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <ProfileHeader username={userProfile.username} />
        <div className="px-4 pt-2">
          <div className="flex items-start gap-6 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
              <img
                src={userProfile.avatar}
                alt={userProfile.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 pt-2">
              <ProfileStats
                posts={userProfile.postsCount}
                followers={userProfile.followersCount}
                following={userProfile.followingCount}
              />
            </div>
          </div>

          <ProfileInfo
            displayName={userProfile.displayName}
            bio={userProfile.bio}
            isOwnProfile={userProfile.isOwnProfile}
          />

          <ProfileHighlights highlights={userProfile.highlights} />

          <ProfileTabs />

          <ProfileGrid posts={userProfile.posts} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
