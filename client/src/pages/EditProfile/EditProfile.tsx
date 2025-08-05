import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";
import ChangeProfilePhotoModal from "../../components/common/ChangeProfilePhotoModal";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import MobileBottomNav from "../../components/common/MobileBottomNav";

interface EditProfileFormData {
  fullName: string;
  userName: string;
  bio: string;
  website: string;
  gender: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();
  const { user, updateUserProfile } = useAuthContext();
  const currentUser = getCurrentUser();

  const [formData, setFormData] = useState<EditProfileFormData>({
    fullName: "",
    userName: "",
    bio: "",
    website: "",
    gender: "",
  });

  const [showChangePhotoModal, setShowChangePhotoModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [showAccountSuggestions, setShowAccountSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

  // Fixed useEffect with proper dependencies and initialization
  useEffect(() => {
    const userData = user || currentUser;
    if (userData) {
      const newFormData = {
        fullName: userData.fullName || "",
        userName: userData.userName || userData.username || "",
        bio: userData.bio || "",
        website: userData.website || "",
        gender: userData.gender || "",
      };

      const newProfileImage = userData.profilePicture || defaultImage;

      // Only update if data has actually changed to prevent infinite loops
      setFormData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(newFormData)) {
          return newFormData;
        }
        return prev;
      });

      setProfileImage((prev) =>
        prev !== newProfileImage ? newProfileImage : prev
      );
    }
  }, [user?.id, currentUser?.id]); // Only depend on user ID to prevent infinite loops

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any existing errors when user starts typing
    if (formError) {
      setFormError(null);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      setIsLoading(true);

      // Create a local URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Update the user profile in context immediately
      updateUserProfile({
        profilePicture: imageUrl,
      });

      setShowChangePhotoModal(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      setFormError("Failed to upload profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoRemove = async () => {
    try {
      setIsLoading(true);

      // Set to default image
      setProfileImage(defaultImage);

      // Update the user profile in context immediately
      updateUserProfile({
        profilePicture: defaultImage,
      });

      setShowChangePhotoModal(false);
    } catch (error) {
      console.error("Error removing photo:", error);
      setFormError("Failed to remove profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setFormError(null);
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        setFormError("Full name is required");
        return;
      }

      if (!formData.userName.trim()) {
        setFormError("Username is required");
        return;
      }

      // Update user profile in context and localStorage
      updateUserProfile({
        fullName: formData.fullName.trim(),
        userName: formData.userName.trim(),
        username: formData.userName.trim(), // For backward compatibility
        bio: formData.bio.trim(),
        website: formData.website.trim(),
        gender: formData.gender,
        profilePicture: profileImage,
      });

      // Navigate back to profile
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setFormError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handleSubmitClick = () => {
    handleSubmit();
  };

  const handleSidebarItemClick = (item: string) => {
    console.log("Sidebar item clicked:", item);

    // Handle navigation from sidebar
    switch (item) {
      case "home":
        navigate("/");
        break;
      case "explore":
        navigate("/explore");
        break;
      case "search":
        navigate("/search");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "create":
        navigate("/create");
        break;
      default:
        console.log(`Navigation for ${item} not implemented`);
    }
  };

  const displayUsername =
    formData.userName ||
    user?.userName ||
    user?.username ||
    currentUser?.userName ||
    currentUser?.username ||
    "";

  const displayFullName =
    formData.fullName || user?.fullName || currentUser?.fullName || "";

  // Ensure profileImage is never empty
  const safeProfileImage = profileImage || defaultImage;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="w-full bg-white min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-medium">Edit profile</h1>
            <button
              onClick={handleSubmitClick}
              disabled={isLoading}
              className="text-blue-500 font-medium disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Done"}
            </button>
          </div>

          {/* Content */}
          <div className="bg-white">
            {/* Error Display */}
            {formError && (
              <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {formError}
              </div>
            )}

            {/* Profile Photo Section */}
            <div className="p-6 bg-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={safeProfileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {displayUsername}
                    </div>
                    <div className="text-sm text-gray-600">
                      {displayFullName}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangePhotoModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Change photo
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="divide-y divide-gray-200">
              {/* Name */}
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 placeholder-gray-400"
                />
              </div>

              {/* Username */}
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 placeholder-gray-400"
                />
              </div>

              {/* Website */}
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Website"
                  className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Editing your links is only available on mobile. Visit the
                  Instagram app and edit your profile to change the websites in
                  your bio.
                </p>
              </div>

              {/* Bio */}
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={150}
                  placeholder="Tell people about yourself"
                  className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 placeholder-gray-400 resize-none"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">
                    {formData.bio.length} / 150
                  </span>
                </div>
              </div>

              {/* Gender */}
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="">Not specified</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  This won't be part of your public profile.
                </p>
              </div>
            </div>

            {/* Account Suggestions Toggle */}
            <div className="p-4 border-t border-gray-200">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Show account suggestions on profiles
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Show account suggestions on profiles
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose whether people can see similar account suggestions
                      on your profile, and whether your account can be suggested
                      on other profiles.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={showAccountSuggestions}
                      onChange={(e) =>
                        setShowAccountSuggestions(e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                Certain profile info, like your name, bio and links, is visible
                to everyone.{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  See what profile info is visible
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <div className="p-4 bg-white">
              <button
                onClick={handleSubmitClick}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav
            activeItem="profile"
            onItemClick={handleSidebarItemClick}
            userAvatar={safeProfileImage}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative">
        {/* Sidebar */}
        <Sidebar
          activeItem="profile"
          onItemClick={handleSidebarItemClick}
          userAvatar={safeProfileImage}
        />

        {/* Main Content */}
        <div className="transition-all duration-300 ease-out ml-80">
          <div className="max-w-2xl mx-auto py-12">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">Edit Profile</h1>
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Error Display */}
                {formError && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {formError}
                  </div>
                )}

                {/* Profile Photo Section */}
                <div className="flex items-center mb-8">
                  <img
                    src={safeProfileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover mr-6"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {displayUsername}
                    </h3>
                    <p className="text-gray-500 text-sm">{displayFullName}</p>
                    <button
                      onClick={() => setShowChangePhotoModal(true)}
                      className="text-blue-500 font-semibold text-sm mt-1 hover:underline"
                    >
                      Change photo
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-right font-medium text-gray-700">
                      Name
                    </label>
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-right font-medium text-gray-700">
                      Username
                    </label>
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-start">
                    <label className="text-right font-medium text-gray-700 pt-2">
                      Website
                    </label>
                    <div className="col-span-2">
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="Website"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-start">
                    <label className="text-right font-medium text-gray-700 pt-2">
                      Bio
                    </label>
                    <div className="col-span-2">
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        maxLength={150}
                        placeholder="Tell people about yourself"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-gray-500">
                          {formData.bio.length} / 150
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-start">
                    <label className="text-right font-medium text-gray-700 pt-2">
                      Gender
                    </label>
                    <div className="col-span-2">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Not specified</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        This won't be part of your public profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Photo Modal */}
      <ChangeProfilePhotoModal
        isOpen={showChangePhotoModal}
        onClose={() => setShowChangePhotoModal(false)}
        onUpload={handlePhotoUpload}
        onRemove={handlePhotoRemove}
        hasCurrentPhoto={safeProfileImage !== defaultImage}
      />
    </div>
  );
};

export default EditProfile;
