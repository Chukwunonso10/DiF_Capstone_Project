import { useEffect, useState } from "react";
import type { FC } from "react";
import PostCard from "../post/index";
import CarouselPost from "../post/CarouselPost";

interface Post {
  type: "single" | "carousel";
  username: string;
  location: string;
  caption: string;
  imageUrl?: string;
  images?: string[];
}

const Feed: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const placeholderPosts: Post[] = [
      {
        type: "single",
        username: "joshua_l",
        location: "Tokyo, Japan",
        imageUrl: "https://source.unsplash.com/random/800x800?japan",
        caption: "Exploring Tokyo was incredible! 🗼",
      },
      {
        type: "carousel",
        username: "mary_c",
        location: "Paris, France",
        images: [
          "https://source.unsplash.com/random/800x800?paris",
          "https://source.unsplash.com/random/800x800?eiffel",
          "https://source.unsplash.com/random/800x800?france",
        ],
        caption: "A Paris photo dump 💕",
      },
      {
        type: "single",
        username: "alex_r",
        location: "Lagos, Nigeria",
        imageUrl: "https://source.unsplash.com/random/800x800?nature,lagos",
        caption: "Golden hour in Lagos 🌅",
      },
    ];

    setTimeout(() => setPosts(placeholderPosts), 500);
  }, []);

  return (
    <div className="px-4 max-w-xl mx-auto py-4 space-y-6">
      {posts.map((post, index) =>
        post.type === "carousel" ? (
          <CarouselPost key={index} {...post} images={post.images || []} />
        ) : (
          <PostCard
            key={index}
            username={post.username}
            location={post.location}
            imageUrl={post.imageUrl || ""}
            caption={post.caption}
          />
        )
      )}
    </div>
  );
};

export default Feed;
