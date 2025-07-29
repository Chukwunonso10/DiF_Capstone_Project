import type { FC } from "react";

interface PostProps {
  username: string;
  location: string;
  imageUrl: string;
  caption: string;
}

const PostCard: FC<PostProps> = ({ username, location, imageUrl, caption }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/50?u=${username}`}
            alt={username}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
        <button className="text-xl">⋮</button>
      </div>

      <img src={imageUrl} alt={caption} className="w-full object-cover" />

      <div className="px-4 py-2">
        <div className="flex gap-4 text-xl mb-2">
          <button>❤️</button>
          <button>💬</button>
          <button>📩</button>
        </div>
        <p className="font-semibold text-sm">{username}</p>
        <p className="text-sm">{caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
