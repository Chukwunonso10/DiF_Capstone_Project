import React from "react";

interface ProfileStatsProps {
  posts: number;
  followers: number;
  following: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  posts,
  followers,
  following,
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  return (
    <div className="flex justify-between items-center">
      <div className="text-center">
        <div className="font-semibold text-lg">{posts}</div>
        <div className="text-gray-600 text-sm">Posts</div>
      </div>
      <div className="text-center">
        <div className="font-semibold text-lg">{formatNumber(followers)}</div>
        <div className="text-gray-600 text-sm">Followers</div>
      </div>
      <div className="text-center">
        <div className="font-semibold text-lg">{formatNumber(following)}</div>
        <div className="text-gray-600 text-sm">Following</div>
      </div>
    </div>
  );
};

export default ProfileStats;
