import React, { useState } from "react";
import SearchSidebar from "../../common/SearchSidebar";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  isCollapsed?: boolean;
  userAvatar?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "profile",
  onItemClick,
  isCollapsed = false,
  userAvatar = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
}) => {
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Search",
      icon: (
        <svg
          className="w-7 h-7"
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
      ),
    },
    {
      id: "explore",
      label: "Explore",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
    },
    {
      id: "reels",
      label: "Reels",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <div className="relative">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            2
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: (
        <div className="relative">
          <svg
            className="w-7 h-7"
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
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      ),
    },
    {
      id: "create",
      label: "Create",
      icon: (
        <svg
          className="w-7 h-7"
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
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <div className="w-7 h-7 rounded-full overflow-hidden">
          <img
            src={userAvatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
  ];

  const bottomItems = [
    {
      id: "meta-ai",
      label: "Meta AI",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "ai-studio",
      label: "AI Studio",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
      ),
    },
    {
      id: "threads",
      label: "Threads",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01 1.5 4.977 5.226 3.174 8.81 3.174c1.938 0 3.329.554 4.132 1.644.35.474.394 1.137.108 1.644l-.394.394c-.474.394-1.204.394-1.678 0-.157-.236-.394-.394-.631-.552-.631-.315-1.441-.315-2.152-.315-2.231 0-4.461 1.204-4.461 7.143 0 5.939 2.23 7.064 4.461 7.064 1.598 0 2.546-.552 2.94-1.762.157-.473.394-.788.71-.946.552-.236 1.204-.079 1.598.394.236.315.315.631.236 1.046-.631 2.467-2.15 3.828-4.539 3.907z" />
        </svg>
      ),
    },
    {
      id: "more",
      label: "More",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === "search") {
      setShowSearchSidebar(true);
    } else {
      onItemClick?.(itemId);
    }
  };

  const handleCloseSearchSidebar = () => {
    setShowSearchSidebar(false);
  };

  return (
    <div className="flex">
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-80"
        }`}
      >
        <div className="p-8 border-b border-gray-200">
          {isCollapsed ? (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ) : (
            <h1
              className="text-3xl font-normal"
              style={{ fontFamily: "Billabong, cursive" }}
            >
              Instagram
            </h1>
          )}
        </div>

        <nav className="flex-1 py-8">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = activeItem === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-4 px-8 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg mx-4 ${
                      isActive ? "font-bold bg-gray-50" : "font-normal"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        isActive ? "scale-110" : ""
                      } transition-transform`}
                    >
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <span className="text-lg">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="py-4 border-t border-gray-200">
          <ul className="space-y-2">
            {bottomItems.map((item) => {
              const isActive = activeItem === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-4 px-8 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg mx-4 ${
                      isActive ? "font-bold bg-gray-50" : "font-normal"
                    }`}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    {!isCollapsed && (
                      <span className="text-lg">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Search Sidebar */}
      <SearchSidebar
        isOpen={showSearchSidebar}
        onClose={handleCloseSearchSidebar}
      />
    </div>
  );
};

export default Sidebar;
