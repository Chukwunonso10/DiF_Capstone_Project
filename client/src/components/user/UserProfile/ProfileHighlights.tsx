// src/components/user/ProfileHighlights.tsx
import React from "react";
import { Plus } from "lucide-react";

interface Highlight {
  id: number;
  name: string;
  image: string;
  isNew?: boolean;
}

interface ProfileHighlightsProps {
  highlights: Highlight[];
}

const ProfileHighlights: React.FC<ProfileHighlightsProps> = ({
  highlights,
}) => {
  return (
    <div className="flex gap-6 py-4 mb-4 px-1">
      {highlights.map((highlight) => (
        <div key={highlight.id} className="flex flex-col items-center gap-2">
          {highlight.isNew ? (
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full overflow-hidden ring-1 ring-gray-200">
              <img
                src={highlight.image}
                alt={highlight.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className="text-xs text-gray-900 font-medium">
            {highlight.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfileHighlights;
