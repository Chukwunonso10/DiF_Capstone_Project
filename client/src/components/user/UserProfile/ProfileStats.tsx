import React from "react";

interface ProfileStatsProps {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  layout?: "horizontal" | "vertical";
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  postsCount,
  followersCount,
  followingCount,
  layout = "horizontal",
}) => {
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  const containerClass =
    layout === "horizontal"
      ? "flex justify-between"
      : "flex justify-start gap-8";

  const itemClass = layout === "horizontal" ? "text-center" : "text-left";

  const countClass =
    layout === "horizontal"
      ? "font-semibold text-sm block"
      : "font-semibold text-lg";

  const labelClass =
    layout === "horizontal" ? "text-gray-600 text-xs" : "text-gray-600 ml-1";

  return (
    <div className={containerClass}>
      <div className={itemClass}>
        <span className={countClass}>{formatCount(postsCount)}</span>
        <span className={labelClass}>posts</span>
      </div>
      <div className={itemClass}>
        <span className={countClass}>{formatCount(followersCount)}</span>
        <span className={labelClass}>followers</span>
      </div>
      <div className={itemClass}>
        <span className={countClass}>{formatCount(followingCount)}</span>
        <span className={labelClass}>following</span>
      </div>
    </div>
  );
};

export default ProfileStats;
