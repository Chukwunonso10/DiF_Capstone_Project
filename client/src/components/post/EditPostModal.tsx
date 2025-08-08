/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { postService } from "../../services/api/postService";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import type { UpdatePostData } from "../../types/postTypes";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostUpdated: () => void;
  post: {
    _id: string;
    content?: string;
    tags?: string[];
  };
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  onPostUpdated,
  post,
}) => {
  const [content, setContent] = useState(post.content || "");
  const [tags, setTags] = useState(post.tags?.join(", ") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const postData: UpdatePostData = {
        content: content.trim() || undefined,
        tags: tags.trim()
          ? tags.split(",").map((tag) => tag.trim())
          : undefined,
      };

      const response = await postService.updatePost(post._id, postData);
      if (response.success) {
        onPostUpdated();
        onClose();
      } else {
        setError(response.message || "Failed to update post");
      }
    } catch (err) {
      setError("An error occurred while updating the post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Post">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Caption"
            value={content}
            onValueChange={(value: string) => setContent(value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onValueChange={(value: string) => setTags(value)}
            className="w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            {isLoading ? "Updating..." : "Update Post"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPostModal;
