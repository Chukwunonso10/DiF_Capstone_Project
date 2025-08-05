import React from "react";

interface OtherUserStatsProps {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  layout?: "horizontal" | "vertical";
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
  className?: string;
}

const OtherUserStats: React.FC<OtherUserStatsProps> = ({
  postsCount,
  followersCount,
  followingCount,
  layout = "horizontal",
  onFollowersClick,
  onFollowingClick,
  className = "",
}) => {
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const stats = [
    {
      label: "posts",
      value: formatCount(postsCount),
      rawValue: postsCount,
      onClick: undefined,
    },
    {
      label: "followers",
      value: formatCount(followersCount),
      rawValue: followersCount,
      onClick: onFollowersClick,
    },
    {
      label: "following",
      value: formatCount(followingCount),
      rawValue: followingCount,
      onClick: onFollowingClick,
    },
  ];

  if (layout === "vertical") {
    return (
      <div className={`flex justify-center gap-8 lg:gap-12 ${className}`}>
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className={`text-center ${
              stat.onClick
                ? "hover:text-gray-600 cursor-pointer"
                : "cursor-default"
            } transition-colors`}
            disabled={!stat.onClick}
          >
            <div className="text-lg lg:text-xl font-bold text-gray-900">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 capitalize">{stat.label}</div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex justify-center gap-6 ${className}`}>
      {stats.map((stat) => (
        <button
          key={stat.label}
          onClick={stat.onClick}
          className={`text-center ${
            stat.onClick
              ? "hover:text-gray-600 cursor-pointer"
              : "cursor-default"
          } transition-colors`}
          disabled={!stat.onClick}
        >
          <span className="font-bold text-gray-900 mr-1">{stat.value}</span>
          <span className="text-gray-600 text-sm">{stat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default OtherUserStats;
