import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuthContext } from "../../context/AuthContext";
import OtherUserProfile from "../../components/user/OtherUserProfile/OtherUserProfile";
import { userService } from "../../services/api/userService";

const OtherUserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user: currentUser, updateUserProfile } = useAuthContext();

  const { userProfile, isLoading, error, refetch } = useUserProfile(
    username || ""
  );

  const handleFollowUser = async (userId: string) => {
    if (!userProfile || !currentUser) return;

    try {
      const response = await userService.toggleFollow(userId);
      console.log("Toggle follow response:", JSON.stringify(response, null, 2));

      if (response.success) {
        await refetch();

        const currentUserResponse = await userService.getUserByIdentifier(
          currentUser.userName || currentUser.username || ""
        );
        if (currentUserResponse.success && currentUserResponse.data) {
          updateUserProfile({
            followingCount: currentUserResponse.data.following?.length || 0,
          });
        }
      } else {
        console.error("Error following/unfollowing user:", response.message);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  if (
    currentUser &&
    username === (currentUser.userName || currentUser.username)
  ) {
    navigate("/profile", { replace: true });
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Profile not found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The user you're looking for doesn't exist."}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Profile not found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load user profile. Please try again.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={refetch}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <OtherUserProfile
      userProfile={userProfile}
      onFollowUser={handleFollowUser}
      currentUserAvatar={currentUser?.profilePicture}
    />
  );
};

export default OtherUserProfilePage;
