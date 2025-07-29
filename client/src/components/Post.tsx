import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface PostProps {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  timeAgo: string;
  location?: string;
}

export default function Post({ username, avatar, image, caption, likes, timeAgo, location }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article className="bg-background lg:border lg:border-instagram-border lg:rounded-lg lg:mb-6">
      {/* Post Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <span className="font-semibold text-sm text-instagram-text">{username}</span>
            {location && <div className="text-xs text-instagram-gray">{location}</div>}
          </div>
        </div>
        <MoreHorizontal className="h-6 w-6 text-instagram-gray" />
      </header>

      {/* Post Image */}
      <div className="relative">
        <img
          src={image}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="transition-colors"
            >
              <Heart 
                className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : "text-instagram-text"}`} 
              />
            </button>
            <MessageCircle className="h-6 w-6 text-instagram-text" />
            <Send className="h-6 w-6 text-instagram-text" />
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="transition-colors"
          >
            <Bookmark 
              className={`h-6 w-6 ${isSaved ? "fill-current text-instagram-text" : "text-instagram-text"}`} 
            />
          </button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm text-instagram-text">
            {likes.toLocaleString()} likes
          </span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm text-instagram-text mr-2">{username}</span>
          <span className="text-sm text-instagram-text">{caption}</span>
        </div>

        {/* View Comments */}
        <button className="text-sm text-instagram-gray mb-2">
          View all 44 comments
        </button>

        {/* Time */}
        <div className="text-xs text-instagram-gray uppercase">
          {timeAgo}
        </div>
      </div>
    </article>
  );
}
