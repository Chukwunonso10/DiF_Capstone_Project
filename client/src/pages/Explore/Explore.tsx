import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import MobileBottomNav from "../../components/common/MobileBottomNav";

const Explore: React.FC = () => {
  const navigate = useNavigate();

  const exploreItems = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 1234,
      comments: 56,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1551834369-8d3364b21848?w=400&h=400&fit=crop",
      isVideo: true,
      likes: 2345,
      comments: 78,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 3456,
      comments: 90,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 4567,
      comments: 123,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 5678,
      comments: 145,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=400&h=400&fit=crop",
      isVideo: true,
      likes: 6789,
      comments: 167,
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 3456,
      comments: 90,
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=400&h=400&fit=crop",
      isVideo: true,
      likes: 6789,
      comments: 167,
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 5678,
      comments: 145,
    },
  ];

  const handleSidebarClick = (item: string) => {
    if (item === "logout") {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      navigate("/login");
    } else {
      console.log("Sidebar clicked:", item);
    }
  };

  const handlePostClick = (id: string) => {
    console.log("Post clicked:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeItem="explore"
        onItemClick={handleSidebarClick}
        userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      />

      <div className="lg:ml-80 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {exploreItems.map((item, index) => {
                const isLarge = index % 7 === 0;

                return (
                  <div
                    key={item.id}
                    onClick={() => handlePostClick(item.id)}
                    className={`relative cursor-pointer overflow-hidden ${
                      isLarge
                        ? "col-span-2 row-span-2 aspect-square"
                        : "aspect-square"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {item.isVideo && (
                      <div className="absolute top-3 right-3">
                        <svg
                          className="w-5 h-5 text-white drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex items-center gap-6 text-white">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span>{item.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M13,16.5H5.5V15H13V16.5M16.5,13H5.5V11.5H16.5V13M18.5,9.5H5.5V8H18.5V9.5Z" />
                          </svg>
                          <span>{item.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav
        activeItem="search"
        onItemClick={(item) => console.log("Mobile nav:", item)}
        userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      />
    </div>
  );
};

export default Explore;
