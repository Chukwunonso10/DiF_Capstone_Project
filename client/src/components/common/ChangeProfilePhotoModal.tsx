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
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      setError(null);

      // Client-side validation
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Please select an image smaller than 5MB");
        return;
      }

      setIsUploading(true);
      try {
        await onUpload(file);
        // Modal will be closed by parent component on success
      } catch (error) {
        console.error("Error uploading file:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to upload image. Please try again."
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleUploadClick = () => {
    if (isUploading || isRemoving) return;

    setError(null);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileSelect;
    input.click();
  };

  const handleRemoveClick = async () => {
    if (isUploading || isRemoving) return;

    setError(null);
    setIsRemoving(true);
    try {
      await onRemove();
      // Modal will be closed by parent component on success
    } catch (error) {
      console.error("Error removing photo:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove photo. Please try again."
      );
    } finally {
      setIsRemoving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isUploading && !isRemoving) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (!isUploading && !isRemoving) {
      setError(null);
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

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-100 border-b border-red-200">
            <p className="text-red-700 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          <button
            onClick={handleUploadClick}
            disabled={isUploading || isRemoving}
            className="w-full py-4 px-6 text-blue-500 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                Uploading...
              </>
            ) : (
              "Upload Photo"
            )}
          </button>

          {hasCurrentPhoto && (
            <button
              onClick={handleRemoveClick}
              disabled={isUploading || isRemoving}
              className="w-full py-4 px-6 text-red-500 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isRemoving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                  Removing...
                </>
              ) : (
                "Remove Current Photo"
              )}
            </button>
          )}

          <button
            onClick={handleCloseClick}
            disabled={isUploading || isRemoving}
            className="w-full py-4 px-6 text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>

        {(isUploading || isRemoving) && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">
                {isUploading ? "Uploading image..." : "Removing image..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeProfilePhotoModal;
