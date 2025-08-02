import React from "react";
import StoryList from "../story/StoryList";
import PostCard from "../post/PostCard";

const mockPosts = [
  {
    id: "1",
    username: "clarisunique",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    location: "Ajah, Lekki, Lagos",
    timeAgo: "1d",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop",
    likes: 11,
    caption: "Swipe and learn 👍👍",
    comments: 2,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    username: "johndoe",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    location: "Victoria Island, Lagos",
    timeAgo: "2h",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    likes: 25,
    caption: "Beautiful sunset today! 🌅",
    comments: 5,
    isLiked: true,
    isSaved: false,
  },
];

const Feed: React.FC = () => {
  const handlePostLike = (postId: string) => {
    console.log("Post liked:", postId);
  };

  const handlePostComment = (postId: string, comment: string) => {
    console.log("Comment added to post:", postId, comment);
  };

  const handlePostSave = (postId: string) => {
    console.log("Post saved:", postId);
  };

  const handlePostShare = (postId: string) => {
    console.log("Post shared:", postId);
  };

  return (
    <div className="w-full">
      <div className="bg-transparent py-8">
        <StoryList />
      </div>

      <div className="space-y-12">
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handlePostLike}
            onComment={handlePostComment}
            onSave={handlePostSave}
            onShare={handlePostShare}
          />
        ))}
      </div>

      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default Feed;
