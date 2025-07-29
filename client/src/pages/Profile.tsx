import { Grid, Menu, Settings, Tag, User } from "lucide-react";
import { useState } from "react";

const userPosts = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop"
];

const tabs = [
  { id: "posts", icon: Grid, label: "Posts" },
  { id: "tagged", icon: Tag, label: "Tagged" }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="bg-background min-h-screen">
      {/* Profile Header */}
      <div className="p-4 lg:p-8 lg:max-w-4xl lg:mx-auto">
        {/* User Info Section */}
        <div className="flex items-start space-x-4 lg:space-x-8 mb-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-20 h-20 lg:w-32 lg:h-32 rounded-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            {/* Username and Settings */}
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-xl lg:text-2xl font-light text-instagram-text">jacob_w</h1>
              <div className="flex items-center space-x-2">
                <button className="lg:hidden">
                  <Menu className="h-6 w-6 text-instagram-text" />
                </button>
                <button className="hidden lg:block px-3 py-1 border border-instagram-border rounded text-sm font-medium text-instagram-text">
                  Edit Profile
                </button>
                <button className="hidden lg:block">
                  <Settings className="h-6 w-6 text-instagram-text" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-6 lg:space-x-8 mb-4">
              <div className="text-center lg:text-left">
                <div className="font-semibold text-instagram-text">54</div>
                <div className="text-sm text-instagram-gray">Posts</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-semibold text-instagram-text">834</div>
                <div className="text-sm text-instagram-gray">Followers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-semibold text-instagram-text">162</div>
                <div className="text-sm text-instagram-gray">Following</div>
              </div>
            </div>

            {/* Bio */}
            <div className="hidden lg:block">
              <div className="font-semibold text-sm text-instagram-text mb-1">Jacob West</div>
              <div className="text-sm text-instagram-text">
                Digital product designer @palantir
              </div>
              <div className="text-sm text-instagram-text">
                Living in New York
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bio */}
        <div className="lg:hidden mb-6">
          <div className="font-semibold text-sm text-instagram-text mb-1">Jacob West</div>
          <div className="text-sm text-instagram-text">
            Digital product designer @palantir
          </div>
          <div className="text-sm text-instagram-text">
            Living in New York
          </div>
        </div>

        {/* Mobile Edit Profile Button */}
        <div className="lg:hidden mb-6">
          <button className="w-full py-2 border border-instagram-border rounded text-sm font-medium text-instagram-text">
            Edit Profile
          </button>
        </div>

        {/* Highlights */}
        <div className="flex space-x-4 mb-6 overflow-x-auto scrollbar-hide">
          {["New", "Friends", "Sport", "Design"].map((highlight, index) => (
            <div key={highlight} className="flex flex-col items-center space-y-1 min-w-0">
              <div className="w-16 h-16 bg-instagram-light-gray rounded-full flex items-center justify-center border-2 border-instagram-border">
                <User className="h-8 w-8 text-instagram-gray" />
              </div>
              <span className="text-xs text-instagram-text max-w-[70px] truncate">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-instagram-border bg-background sticky top-14 lg:top-16 z-40">
        <div className="flex justify-center lg:max-w-4xl lg:mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 lg:flex-initial lg:px-8 py-3 flex items-center justify-center space-x-2 border-t-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-instagram-text border-instagram-text"
                    : "text-instagram-gray border-transparent"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline text-xs font-medium uppercase tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="lg:max-w-4xl lg:mx-auto">
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 gap-0.5 lg:gap-1">
            {userPosts.map((post, index) => (
              <div key={index} className="aspect-square relative group cursor-pointer">
                <img
                  src={post}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 hidden lg:block" />
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "tagged" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-2 border-instagram-text rounded-full flex items-center justify-center mb-4">
              <Tag className="h-8 w-8 text-instagram-text" />
            </div>
            <div className="text-lg font-light text-instagram-text mb-2">No Photos</div>
            <div className="text-sm text-instagram-gray text-center max-w-xs">
              When people tag you in photos, they'll appear here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
