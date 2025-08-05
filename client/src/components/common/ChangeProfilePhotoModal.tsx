import React, { useState } from "react";

interface ChangeProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
  hasCurrentPhoto: boolean;
}

const ChangeProfilePhotoModal: React.FC<ChangeProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  onRemove,
  hasCurrentPhoto,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      setIsUploading(true);
      try {
        await onUpload(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileSelect;
    input.click();
  };

  const handleRemoveClick = async () => {
    setIsRemoving(true);
    try {
      await onRemove();
    } catch (error) {
      console.error("Error removing photo:", error);
      alert("Failed to remove photo. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isUploading && !isRemoving) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-sm w-full mx-4 overflow-hidden">
        <div className="p-6 text-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Change Profile Photo
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          <button
            onClick={handleUploadClick}
            disabled={isUploading || isRemoving}
            className="w-full py-4 px-6 text-blue-500 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload Photo"}
          </button>

          {hasCurrentPhoto && (
            <button
              onClick={handleRemoveClick}
              disabled={isUploading || isRemoving}
              className="w-full py-4 px-6 text-red-500 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRemoving ? "Removing..." : "Remove Current Photo"}
            </button>
          )}

          <button
            onClick={onClose}
            disabled={isUploading || isRemoving}
            className="w-full py-4 px-6 text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePhotoModal;
