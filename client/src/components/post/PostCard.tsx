import React, { useState } from "react";
import PostActions from "./PostActions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PostComments from "./PostComments";

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  location?: string;
  timeAgo: string;
  image: string;
  likes: number;
  caption: string;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onSave: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onSave,
  onShare,
}) => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(post.id);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment("");
    }
  };

  const handleShare = () => {
    onShare(post.id);
  };

  return (
    <div className="bg-transparent overflow-hidden">
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center space-x-4">
          <img
            src={post.userAvatar}
            alt={post.username}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm">{post.username}</h3>
            {post.location && (
              <p className="text-xs text-gray-500 mt-1">
                {post.location} • {post.timeAgo}
              </p>
            )}
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-800 p-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <div className="relative mb-4">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-96 object-cover rounded-lg"
        />

        {post.id === "1" && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-95 rounded-lg p-4 max-w-xs text-center shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 leading-tight">
              What does your C of O Land/Property mean??
            </h2>
          </div>
        )}
      </div>

      <PostActions
        isLiked={isLiked}
        isSaved={isSaved}
        onLike={handleLike}
        onComment={() => {}}
        onShare={handleShare}
        onSave={handleSave}
      />

      <div className="py-2">
        <div className="mb-3">
          <span className="font-semibold text-sm">
            {likesCount > 0 && "❤️ "}
            {likesCount} likes
          </span>
        </div>

        <div className="mb-3">
          <span className="font-semibold text-sm mr-2">{post.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {post.comments > 0 && (
          <button className="text-sm text-gray-500 mb-4 hover:text-gray-700">
            View all {post.comments} comments
          </button>
        )}

        <div className="flex items-center space-x-4 pt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
            className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
          />
          {comment.trim() && (
            <button
              onClick={handleCommentSubmit}
              className="text-blue-500 font-semibold text-sm hover:text-blue-600"
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
