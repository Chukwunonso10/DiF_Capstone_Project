import React from "react";

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
}

interface StoryItemProps {
  story: Story;
  onClick: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ story, onClick }) => {
  return (
    <div
      className="flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0"
      onClick={onClick}
    >
      <div
        className={`w-16 h-16 rounded-full p-0.5 ${
          story.hasStory
            ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
            : "bg-gray-200"
        }`}
      >
        <div className="w-full h-full rounded-full bg-white p-0.5">
          <img
            src={story.avatar}
            alt={story.username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-gray-800 max-w-[64px] truncate">
        {story.username}
      </span>
    </div>
  );
};

export default StoryItem;
