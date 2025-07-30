import React from "react";
import { Play } from "lucide-react";

type Post = {
  id: number;
  image: string;
  type: "image" | "video" | "carousel";
};

interface ProfileGridProps {
  posts: Post[];
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1 pb-20">
      {posts.map((post) => (
        <div key={post.id} className="aspect-square relative">
          <img
            src={post.image}
            alt={`Post ${post.id}`}
            className="w-full h-full object-cover"
          />
          {post.type === "video" && (
            <div className="absolute top-2 right-2">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;
