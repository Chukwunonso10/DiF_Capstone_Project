import React from "react";

interface ProfileBioProps {
  displayName: string;
  bio: string;
  website?: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  displayName,
  bio,
  website,
}) => {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-sm mb-1">{displayName}</h2>
      <p className="text-sm whitespace-pre-line leading-relaxed mb-2">{bio}</p>
      {website && (
        <a href={website} className="text-sm text-blue-900 font-medium">
          {website}
        </a>
      )}
    </div>
  );
};

export default ProfileBio;
