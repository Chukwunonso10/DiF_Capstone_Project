const stories = [
  {
    id: 1,
    username: "Your Story",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    isOwn: true,
  },
  {
    id: 2,
    username: "kennessey",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e69e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    username: "zackjohn",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    username: "martini_rond",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    username: "craig_love",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

export default function Stories() {
  return (
    <div className="bg-background border-b border-instagram-border lg:border lg:rounded-lg lg:bg-card">
      <div className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-0">
            <div className={`p-0.5 rounded-full ${story.isOwn ? 'bg-instagram-gray' : 'bg-gradient-to-tr from-yellow-400 to-pink-500'}`}>
              <div className="p-0.5 bg-background rounded-full">
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-instagram-text max-w-[70px] truncate">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
