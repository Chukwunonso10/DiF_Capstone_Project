// src/components/user/ProfileInfo.tsx
import React from "react";
import Button from "../../common/Button";

interface ProfileInfoProps {
  displayName: string;
  bio: string;
  isOwnProfile: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  displayName,
  bio,
  isOwnProfile,
}) => {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-sm mb-2">{displayName}</h2>
      <p className="text-sm text-gray-900 mb-4 whitespace-pre-line leading-relaxed">
        {bio}
      </p>

      {isOwnProfile && (
        <Button
          variant="secondary"
          className="w-full py-2.5 text-sm font-semibold border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default ProfileInfo;
