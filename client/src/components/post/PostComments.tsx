/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/post/PostComments.tsx
import React, { useState } from "react";
import type { Comment } from "../../types/postTypes";
import { useAuthContext } from "../../context/AuthContext";

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, comment: string) => void;
  onLikeComment: (commentId: string) => void;
}

const PostComments: React.FC<PostCommentsProps> = ({
  postId,
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  return (
    <div className="px-4 pb-4">
      {comments.length > 0 && (
        <div className="space-y-2 mb-3">
          {comments.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-3">
              <img
                src={
                  comment.user.profilePicture ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt={comment.user.userName}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start">
                  <span className="font-semibold text-sm mr-2">
                    {comment.user.userName}
                  </span>
                  <span className="text-sm text-gray-800">
                    {comment.content}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                  <button className="text-xs text-gray-500 font-semibold">
                    Reply
                  </button>
                </div>
              </div>
              <button
                onClick={() => onLikeComment(comment._id)}
                className="flex-shrink-0 p-1"
              >
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 text-sm border-none outline-none bg-transparent"
        />
        {newComment.trim() && (
          <button
            onClick={handleSubmitComment}
            className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default PostComments;
