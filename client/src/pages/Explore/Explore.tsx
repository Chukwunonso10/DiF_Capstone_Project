import React from "react";
import MobileBottomNav from "../../components/common/MobileBottomNav";
import Sidebar from "../../components/layout/Sidebar/Sidebar";

const Explore: React.FC = () => {
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
    {
      id: "10",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 1567,
      comments: 89,
    },
    {
      id: "11",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=400&fit=crop",
      isVideo: true,
      likes: 2678,
      comments: 134,
    },
    {
      id: "12",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 3789,
      comments: 156,
    },
    {
      id: "13",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 4890,
      comments: 178,
    },
    {
      id: "14",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      isVideo: true,
      likes: 5901,
      comments: 234,
    },
    {
      id: "15",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=400&fit=crop",
      isVideo: false,
      likes: 6123,
      comments: 189,
    },
  ];

  const handleBottomNavClick = (item: string) => {
    console.log("Bottom nav clicked:", item);
  };

  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  const handleSidebarItemClick = (item: string) => {
    console.log("Sidebar item clicked:", item);
  };

  const handlePostClick = (postId: string) => {
    console.log("Post clicked:", postId);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar
          activeItem="explore"
          onItemClick={handleSidebarItemClick}
          isCollapsed={false}
          userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        />
      </div>

      <div className="flex-1 bg-white min-h-screen">
        <div className="lg:hidden h-screen flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-black/80 to-transparent z-30 pointer-events-none" />

          <div className="sticky top-0 bg-white text-white px-4 py-3 z-20">
            <button
              onClick={handleSearchClick}
              className="w-full bg-white rounded-md border border-gray-300 px-3 py-3"
            >
              <div className="flex items-center gap-2 text-black">
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

          <div className="flex-1 overflow-y-auto pb-16">
            <div className="grid grid-cols-3">
              {exploreItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    relative aspect-square cursor-pointer
                    ${index === 0 || index === 3 ? "row-span-2 col-span-2" : ""}
                  `}
                  onClick={() => handlePostClick(item.id)}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />

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

        <div className="hidden lg:block min-h-screen">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
            <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
          </div>

          <div className="px-8 py-6">
            <div className="grid grid-cols-3 gap-1 max-w-6xl">
              {exploreItems.map((item, index) => {
                const isLarge =
                  index === 0 || index === 4 || index === 8 || index === 12;

                return (
                  <div
                    key={item.id}
                    className={`
                      relative cursor-pointer group overflow-hidden
                      ${isLarge ? "col-span-2 row-span-2" : "aspect-square"}
                    `}
                    onClick={() => handlePostClick(item.id)}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

                    {index % 5 === 1 && (
                      <div className="absolute top-3 right-3">
                        <svg
                          className="w-5 h-5 text-white drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11.5-6L9 13h10l-3-4-2.5 3.5-2-2.5zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-6 text-white">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="text-lg font-bold">
                            {item.likes.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M13,16.5H5.5V15H13V16.5M16.5,13H5.5V11.5H16.5V13M18.5,9.5H5.5V8H18.5V9.5Z" />
                          </svg>
                          <span className="text-lg font-bold">
                            {item.comments}
                          </span>
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
        onItemClick={handleBottomNavClick}
        userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
      />
    </div>
  );
};

export default Explore;
