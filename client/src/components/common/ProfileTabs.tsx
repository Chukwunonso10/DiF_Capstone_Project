import React from "react";
import { Grid, Bookmark, Tag } from "lucide-react";

type TabType = "posts" | "saved" | "tagged";

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  showLabels?: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  showLabels = false,
}) => {
  const tabs = [
    { id: "posts" as TabType, icon: Grid, label: "POSTS" },
    { id: "saved" as TabType, icon: Bookmark, label: "SAVED" },
    { id: "tagged" as TabType, icon: Tag, label: "TAGGED" },
  ];

  return (
    <div className="border-t border-gray-200">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                isActive
                  ? "border-t-2 border-black text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              {showLabels && (
                <span className="text-sm font-semibold">{tab.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
