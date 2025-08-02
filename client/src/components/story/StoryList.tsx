import React from "react";
import StoryItem from "./StoryItem";

const mockStories = [
  {
    id: "1",
    username: "michelle_...",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "2",
    username: "pedetlin",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "3",
    username: "toyeen_",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "4",
    username: "skinyelep...",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "5",
    username: "clarisuniq...",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "6",
    username: "realjerry...",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "7",
    username: "sarah_doe",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
  {
    id: "8",
    username: "alex_dev",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=60&h=60&fit=crop&crop=face",
    hasStory: true,
  },
];

interface StoryListProps {
  stories?: typeof mockStories;
}

const StoryList: React.FC<StoryListProps> = ({ stories = mockStories }) => {
  const handleStoryClick = (storyId: string) => {
    console.log("Story clicked:", storyId);
  };

  return (
    <div className="w-full">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            story={story}
            onClick={() => handleStoryClick(story.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
