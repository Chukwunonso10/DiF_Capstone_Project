import React from "react";
import Layout from "../../components/layout/Layout/Layout";

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

  return (
    <Layout
      activeItem="search"
      onItemClick={handleBottomNavClick}
      userAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    >
      <div className="h-full">
        {/* Header with Meta AI Search - Mobile Only */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10 lg:hidden">
          <div className="bg-gray-100 rounded-full px-4 py-2">
            <div className="flex items-center gap-2 text-gray-500">
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
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        </div>

        {/* Explore Grid */}
        <div className="p-1 lg:p-6">
          <div className="grid grid-cols-3 gap-1 lg:gap-4">
            {exploreItems.map((item, index) => (
              <div
                key={item.id}
                className={`
                  relative aspect-square cursor-pointer group
                  ${index === 0 || index === 3 ? "row-span-2 col-span-2" : ""}
                  lg:aspect-square lg:row-span-1 lg:col-span-1
                `}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover lg:rounded-lg"
                />

                {/* Video indicator */}
                {item.isVideo && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-4 h-4 lg:w-6 lg:h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}

                {/* Hover overlay with stats */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 lg:rounded-lg">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">
                        {item.likes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M13,16.5H5.5V15H13V16.5M16.5,13H5.5V11.5H16.5V13M18.5,9.5H5.5V8H18.5V9.5Z" />
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">
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
    </Layout>
  );
};

export default Explore;
