// src/components/common/MobileBottomNav.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileBottomNavProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  userAvatar?: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeItem,
  onItemClick,
  userAvatar = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=30&h=30&fit=crop&crop=face",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on current route if not explicitly provided
  const getActiveItem = () => {
    if (activeItem) return activeItem;

    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/explore") return "search";
    if (path === "/search") return "search";
    if (path.startsWith("/profile")) return "profile";
    return "home";
  };

  const currentActiveItem = getActiveItem();

  const handleItemClick = (itemId: string) => {
    // Call the provided onItemClick if it exists
    if (onItemClick) {
      onItemClick(itemId);
    }

    // Handle navigation
    switch (itemId) {
      case "home":
        navigate("/");
        break;
      case "search":
        navigate("/explore");
        break;
      case "create":
        // TODO: Implement create functionality
        console.log("Create clicked");
        break;
      case "notifications":
        // TODO: Implement notifications functionality
        console.log("Notifications clicked");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  const navItems = [
    {
      id: "home",
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
      id: "create",
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
      id: "notifications",
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      icon: (
        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-300">
          <img
            src={userAvatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black px-0 py-2 z-50">
        <div className="flex justify-between items-center px-4">
          {navItems.map((item) => {
            const isActive = currentActiveItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`p-3 rounded-lg transition-colors ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default MobileBottomNav;
