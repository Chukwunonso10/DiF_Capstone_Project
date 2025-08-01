// src/pages/Explore/Explore.tsx
import React from "react";
import MobileBottomNav from "../../components/common/MobileBottomNav";
import Sidebar from "../../components/layout/Sidebar/Sidebar";

const Explore: React.FC = () => {
  // Mock explore grid data
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
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 7890,
      comments: 189,
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 8901,
      comments: 201,
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 9012,
      comments: 223,
    },
  ];

  const handleBottomNavClick = (item: string) => {
    console.log("Bottom nav clicked:", item);
  };

  const handleSearchClick = () => {
    // TODO: Implement search functionality
    console.log("Search clicked");
  };

  const handleSidebarItemClick = (item: string) => {
    console.log("Sidebar item clicked:", item);
  };

  return (
    <div className="flex min-h-screen bg-black lg:bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeItem="search"
          onItemClick={handleSidebarItemClick}
          isCollapsed={false}
          userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:bg-white min-h-screen">
        {/* Mobile: Full-screen layout */}
        <div className="lg:hidden h-screen flex flex-col">
          {/* Status Bar Overlay */}
          <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-black/80 to-transparent z-30 pointer-events-none" />

          {/* Search Header - Mobile Only */}
          <div className="sticky top-0 bg-black text-white px-4 py-3 z-20">
            <button
              onClick={handleSearchClick}
              className="w-full bg-gray-800 rounded-full px-4 py-2.5"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm">Search with Meta AI</span>
              </div>
            </button>
          </div>

          {/* Explore Grid - Mobile Full Width */}
          <div className="flex-1 overflow-y-auto pb-16">
            <div className="grid grid-cols-3">
              {exploreItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    relative aspect-square cursor-pointer
                    ${index === 0 || index === 3 ? "row-span-2 col-span-2" : ""}
                  `}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  {/* Video indicator */}
                  {item.isVideo && (
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-white drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

                  {/* Multiple images indicator (carousel) */}
                  {index % 4 === 1 && (
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-white drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11.5-6L9 13h10l-3-4-2.5 3.5-2-2.5zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Desktop Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
            <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
          </div>

          {/* Desktop Explore Grid */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {exploreItems.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-square cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />

                  {/* Video indicator */}
                  {item.isVideo && (
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

                  {/* Hover overlay with stats */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
                    <div className="flex items-center gap-4 text-white">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-base font-semibold">
                          {item.likes.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M13,16.5H5.5V15H13V16.5M16.5,13H5.5V11.5H16.5V13M18.5,9.5H5.5V8H18.5V9.5Z" />
                        </svg>
                        <span className="text-base font-semibold">
                          {item.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeItem="search"
        onItemClick={handleBottomNavClick}
        userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      />
    </div>
  );
};

export default Explore;
