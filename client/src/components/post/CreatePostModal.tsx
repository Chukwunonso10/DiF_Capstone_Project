/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";
import { postService } from "../../services/api/postService";
import { useAuthContext } from "../../context/AuthContext";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      ["image/jpeg", "image/png", "video/mp4"].includes(selectedFile.type)
    ) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    } else {
      setError("Please select a valid image (JPEG/PNG) or video (MP4)");
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create a post");
      return;
    }
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("media", file);
      if (content.trim()) formData.append("content", content.trim());
      if (tags.trim())
        formData.append(
          "tags",
          JSON.stringify(tags.split(",").map((tag) => tag.trim()))
        );

      const response = await postService.createPost(formData);
      if (response.success) {
        onPostCreated();
        onClose();
        setContent("");
        setTags("");
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(response.message || "Failed to create post");
      }
    } catch (err) {
      setError("An error occurred while creating the post");
      console.error("Submission Error:", err); // Debug log
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Post">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {preview ? (
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
              {file?.type.startsWith("image") ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ) : (
            <div
              className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V8m0 0l-4 4m4-4l4 4m6-4v8m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <p className="text-sm text-gray-600">Select a photo or video</p>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,video/mp4"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          {preview && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 text-sm font-semibold hover:text-blue-600 mb-4"
            >
              Change File
            </button>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Write a caption..."
            value={content}
            onValueChange={(value: string) => setContent(value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Add tags (comma-separated)"
            value={tags}
            onValueChange={(value: string) => setTags(value)}
            className="w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Share
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
