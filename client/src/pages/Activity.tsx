import { useState } from "react";

const followRequests = [
  {
    id: 1,
    username: "karenne",
    message: "liked your photo.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e69e?w=100&h=100&fit=crop&crop=face",
    timeAgo: "1h",
    postImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=100&h=100&fit=crop"
  }
];

const recentActivity = [
  {
    id: 1,
    username: "kiero_d",
    action: "zakjoho and 26 others",
    message: "liked your photo.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    timeAgo: "1h",
    postImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    username: "respectma",
    action: "liked your photo.",
    message: "Stunning shot! The lightning looks amazing",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    timeAgo: "3h",
    type: "comment"
  },
  {
    id: 3,
    username: "maxjacobson",
    action: "started following you.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    timeAgo: "3h",
    isFollowing: false
  },
  {
    id: 4,
    username: "_phil_fish",
    action: "and others liked your photo.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    timeAgo: "5h",
    postImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop"
  }
];

const thisWeek = [
  {
    id: 5,
    username: "joshua_l",
    action: "liked your photo.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    timeAgo: "2d",
    postImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
  },
  {
    id: 6,
    username: "mis.mariobden",
    action: "started following you.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e69e?w=100&h=100&fit=crop&crop=face",
    timeAgo: "3d",
    isFollowing: true
  }
];

const thisMonth = [
  {
    id: 7,
    username: "_she_travel",
    action: "started following you.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    timeAgo: "1w",
    isFollowing: false
  }
];

export default function Activity() {
  const [activeTab, setActiveTab] = useState("Following");
  const [followingUsers, setFollowingUsers] = useState<{[key: number]: boolean}>({
    3: false,
    6: true,
    7: false
  });

  const handleFollow = (userId: number, currentlyFollowing: boolean) => {
    setFollowingUsers(prev => ({
      ...prev,
      [userId]: !currentlyFollowing
    }));
  };

  const tabs = ["Following", "You"];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-instagram-border bg-background sticky top-14 lg:top-16 z-40">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 lg:flex-initial lg:px-8 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-instagram-text border-instagram-text"
                  : "text-instagram-gray border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:max-w-lg lg:mx-auto">
        {activeTab === "Following" && (
          <div className="p-4">
            {/* Follow Requests */}
            {followRequests.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-instagram-text mb-3">Follow Requests</h3>
                {followRequests.map((request) => (
                  <div key={request.id} className="flex items-center space-x-3 mb-4">
                    <img
                      src={request.avatar}
                      alt={request.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-semibold text-instagram-text">{request.username}</span>
                        <span className="text-instagram-text ml-1">{request.message}</span>
                        <span className="text-instagram-gray ml-1">{request.timeAgo}</span>
                      </div>
                    </div>
                    {request.postImage && (
                      <img
                        src={request.postImage}
                        alt="Post"
                        className="w-10 h-10 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* New */}
            <div className="mb-6">
              <h3 className="font-semibold text-instagram-text mb-3">New</h3>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 mb-4">
                  <img
                    src={activity.avatar}
                    alt={activity.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-semibold text-instagram-text">{activity.username}</span>
                      <span className="text-instagram-text ml-1">{activity.action}</span>
                      <span className="text-instagram-gray ml-1">{activity.timeAgo}</span>
                    </div>
                    {activity.message && (
                      <div className="text-sm text-instagram-gray mt-1">{activity.message}</div>
                    )}
                  </div>
                  {activity.postImage && (
                    <img
                      src={activity.postImage}
                      alt="Post"
                      className="w-10 h-10 object-cover"
                    />
                  )}
                  {activity.isFollowing !== undefined && (
                    <button
                      onClick={() => handleFollow(activity.id, followingUsers[activity.id] || false)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        followingUsers[activity.id]
                          ? "bg-instagram-light-gray text-instagram-text border border-instagram-border"
                          : "bg-instagram-blue text-white"
                      }`}
                    >
                      {followingUsers[activity.id] ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* This Week */}
            <div className="mb-6">
              <h3 className="font-semibold text-instagram-text mb-3">This Week</h3>
              {thisWeek.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 mb-4">
                  <img
                    src={activity.avatar}
                    alt={activity.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-semibold text-instagram-text">{activity.username}</span>
                      <span className="text-instagram-text ml-1">{activity.action}</span>
                      <span className="text-instagram-gray ml-1">{activity.timeAgo}</span>
                    </div>
                  </div>
                  {activity.postImage && (
                    <img
                      src={activity.postImage}
                      alt="Post"
                      className="w-10 h-10 object-cover"
                    />
                  )}
                  {activity.isFollowing !== undefined && (
                    <button
                      onClick={() => handleFollow(activity.id, followingUsers[activity.id] || false)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        followingUsers[activity.id]
                          ? "bg-instagram-light-gray text-instagram-text border border-instagram-border"
                          : "bg-instagram-blue text-white"
                      }`}
                    >
                      {followingUsers[activity.id] ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* This Month */}
            <div className="mb-6">
              <h3 className="font-semibold text-instagram-text mb-3">This Month</h3>
              {thisMonth.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 mb-4">
                  <img
                    src={activity.avatar}
                    alt={activity.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-semibold text-instagram-text">{activity.username}</span>
                      <span className="text-instagram-text ml-1">{activity.action}</span>
                      <span className="text-instagram-gray ml-1">{activity.timeAgo}</span>
                    </div>
                  </div>
                  {activity.isFollowing !== undefined && (
                    <button
                      onClick={() => handleFollow(activity.id, followingUsers[activity.id] || false)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        followingUsers[activity.id]
                          ? "bg-instagram-light-gray text-instagram-text border border-instagram-border"
                          : "bg-instagram-blue text-white"
                      }`}
                    >
                      {followingUsers[activity.id] ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "You" && (
          <div className="p-4">
            <div className="text-center py-16">
              <div className="text-lg font-light text-instagram-text mb-2">Activity On Your Posts</div>
              <div className="text-sm text-instagram-gray">
                When someone likes or comments on one of your posts, you'll see it here.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
