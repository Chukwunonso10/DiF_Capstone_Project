import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

interface BottomNavigationProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  userAvatar?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeItem,
  onItemClick,
  userAvatar = "/api/placeholder/24/24",
}) => {
  const location = useLocation();

  const handleNavClick = (itemId: string) => {
    onItemClick?.(itemId);
  };

  const navItems = [
    {
      icon: Home,
      path: "/",
      id: "home",
      isActive: activeItem === "home" || location.pathname === "/",
    },
    {
      icon: Search,
      path: "/explore",
      id: "search",
      isActive: activeItem === "search" || location.pathname === "/explore",
      isButton: true, // This will be handled as a button instead of a link
    },
    {
      icon: PlusSquare,
      path: "/create",
      id: "create",
      isActive: activeItem === "create" || location.pathname === "/create",
    },
    {
      icon: Heart,
      path: "/notifications",
      id: "notifications",
      isActive:
        activeItem === "notifications" ||
        location.pathname === "/notifications",
    },
    {
      icon: User,
      path: "/profile",
      id: "profile",
      isActive:
        activeItem === "profile" ||
        location.pathname === "/profile" ||
        location.pathname.startsWith("/profile/"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around items-center py-3 max-w-sm mx-auto">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;

          // Handle search button specially
          if (item.isButton) {
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item.id)}
                className="p-2 flex items-center justify-center"
              >
                <IconComponent
                  className={`w-6 h-6 ${
                    item.isActive ? "text-black" : "text-gray-600"
                  }`}
                />
              </button>
            );
          }

          // Handle profile with avatar
          if (item.id === "profile") {
            return (
              <Link
                key={index}
                to={item.path}
                className="p-2 flex items-center justify-center"
                onClick={() => handleNavClick(item.id)}
              >
                <div
                  className={`w-6 h-6 rounded-full overflow-hidden ${
                    item.isActive ? "ring-2 ring-black" : "ring-1 ring-gray-300"
                  }`}
                >
                  <img
                    src={userAvatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            );
          }

          // Handle regular navigation items
          return (
            <Link
              key={index}
              to={item.path}
              className="p-2 flex items-center justify-center"
              onClick={() => handleNavClick(item.id)}
            >
              <IconComponent
                className={`w-6 h-6 ${
                  item.isActive ? "text-black" : "text-gray-600"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
