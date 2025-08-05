import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import SuggestedUsers from "../../components/feed/SuggestedUsers";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    if (item === "logout") {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      navigate("/login");
    } else {
      console.log("Navigation item clicked:", item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeItem="home"
        onItemClick={handleItemClick}
        userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      />

      <div className="lg:ml-80 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="flex gap-16 pt-8">
            <div className="flex-1 max-w-3xl mx-auto lg:mx-0">
              <Feed />
            </div>

            <div className="hidden xl:block w-96 flex-shrink-0">
              <div className="sticky top-8">
                <SuggestedUsers />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center py-2 px-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.005 16.545a2.997 2.997 0 012.997-2.997A2.997 2.997 0 0115 16.545V18h7v2H2v-2h7.005v-1.455z" />
            </svg>
          </button>
          <button className="flex flex-col items-center py-2 px-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="flex flex-col items-center py-2 px-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button className="flex flex-col items-center py-2 px-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="flex flex-col items-center py-2 px-3">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
