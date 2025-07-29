// Export all story components from here

import React from 'react';
import type { FC } from 'react';


const stories = [
  { id: 1, name: 'Your Story' },
  { id: 2, name: 'karenne' },
  { id: 3, name: 'zackjohn' },
];

const StoryList: FC = () => {
  return (
    <div className="flex space-x-3 overflow-x-scroll px-4 py-2">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 p-[2px]">
            <div className="w-full h-full bg-white rounded-full p-[2px]">
              <div className="w-full h-full bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <span className="text-xs mt-1">{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
