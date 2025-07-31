import React from "react";
import { Play } from "lucide-react";

interface Post {
  id: string;
  image: string;
  isVideo?: boolean;
  isMultiple?: boolean;
}

interface PostsGridProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square relative cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onPostClick?.(post)}
        >
          <img
            src={post.image}
            alt={`Post ${post.id}`}
            className="w-full h-full object-cover"
          />

          {post.isVideo && (
            <div className="absolute top-2 right-2">
              <Play className="w-4 h-4 text-white fill-current drop-shadow-lg" />
            </div>
          )}

          {post.isMultiple && (
            <div className="absolute top-2 right-2">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full opacity-80"></div>
                <div className="w-1 h-4 bg-white rounded-full opacity-80"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostsGrid;
