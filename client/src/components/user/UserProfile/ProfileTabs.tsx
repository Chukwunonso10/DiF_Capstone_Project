import React, { useState } from "react";
import { Grid3X3, User } from "lucide-react";

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="border-t border-gray-200">
      <div className="flex">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 ${
            activeTab === "posts"
              ? "border-t-2 border-black"
              : "border-t-2 border-transparent"
          }`}
        >
          <Grid3X3
            className={`w-6 h-6 ${
              activeTab === "posts" ? "text-black" : "text-gray-400"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveTab("tagged")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 ${
            activeTab === "tagged"
              ? "border-t-2 border-black"
              : "border-t-2 border-transparent"
          }`}
        >
          <User
            className={`w-6 h-6 ${
              activeTab === "tagged" ? "text-black" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;
