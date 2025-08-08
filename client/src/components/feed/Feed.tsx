import React, { useState, useEffect } from "react";
import StoryList from "../story/StoryList";
import PostCard from "../post/PostCard";
import { postService } from "../../services/api/postService";
import { useAuthContext } from "../../context/AuthContext";
import type { Post } from "../../types/postTypes";
import CreatePostModal from "../post/CreatePostModal";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuthContext();

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postService.getAllPosts();
      console.log("Fetched Posts:", response); // Debug log
      if (response.success && response.posts) {
        setPosts(response.posts);
      } else {
        setError(response.message || "Failed to fetch posts");
      }
    } catch (err) {
      setError("An error occurred while fetching posts");
      console.error("Fetch Posts Error:", err); // Debug log
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostLike = async (postId: string) => {
    if (!user) return;
    try {
      const response = await postService.toggleLikePost(postId);
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: response.post?.likes || post.likes,
                }
              : post
          )
        );
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handlePostComment = async (postId: string, comment: string) => {
    if (!user) return;
    try {
      const response = await postService.createComment({
        postId,
        content: comment,
      });
      if (response.success && response.comment) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments: [...(post.comments || []), response.comment!],
                }
              : post
          )
        );
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handlePostSave = (postId: string) => {
    console.log("Post saved:", postId); // Implement save functionality if needed
  };

  const handlePostShare = (postId: string) => {
    console.log("Post shared:", postId); // Implement share functionality if needed
  };

  const handlePostCreated = () => {
    console.log("Post created, refreshing feed"); // Debug log
    fetchPosts();
  };

  return (
    <div className="w-full">
      <div className="bg-transparent py-8">
        <StoryList />
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-12">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={{
              id: post._id,
              username: post.user?.userName || "Unknown",
              userAvatar:
                post.user?.profilePicture ||
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              location: "", // Add location if available in API
              timeAgo: new Date(post.createdAt).toLocaleDateString(), // Simplify for now
              image: post.media,
              likes: post.likes.length,
              caption: post.content || "",
              comments: post.comments?.length || 0,
              isLiked: user ? post.likes.includes(user.id) : false,
              isSaved: user ? post.savedBy.includes(user.id) : false,
              _id: post._id,
              content: post.content,
              tags: post.tags,
            }}
            onLike={handlePostLike}
            onComment={handlePostComment}
            onSave={handlePostSave}
            onShare={handlePostShare}
            onDelete={fetchPosts}
            onUpdate={fetchPosts}
          />
        ))}
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default Feed;
