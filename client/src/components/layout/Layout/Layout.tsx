import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import BottomNavigation from "./BottomNavigation";
import SearchSidebar from "../../common/SearchSidebar";
import MobileSearch from "../../common/MobileSearch";

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  activeItem?: string;
  onItemClick?: (item: string) => void;
  userAvatar?: string;
  showDesktopSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showBottomNav = true,
  activeItem,
  onItemClick,
  userAvatar,
  showDesktopSidebar = true,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const location = useLocation();

  const handleMobileSearchClick = () => {
    setShowMobileSearch(true);
  };

  const handleBackFromSearch = () => {
    setShowMobileSearch(false);
  };

  const handleSearchSidebarToggle = () => {
    setShowSearchSidebar(!showSearchSidebar);
  };

  const handleSearchSidebarClose = () => {
    setShowSearchSidebar(false);
  };

  const handleBottomNavClick = (item: string) => {
    if (item === "search") {
      handleMobileSearchClick();
    }
    onItemClick?.(item);
  };

  // Desktop sidebar navigation items
  const sidebarItems = [
    {
      icon: Home,
      path: "/",
      id: "home",
      label: "Home",
      isActive: activeItem === "home" || location.pathname === "/",
    },
    {
      icon: Search,
      path: "#",
      id: "search",
      label: "Search",
      isActive: showSearchSidebar,
      onClick: handleSearchSidebarToggle,
    },
    {
      icon: PlusSquare,
      path: "/create",
      id: "create",
      label: "Create",
      isActive: activeItem === "create" || location.pathname === "/create",
    },
    {
      icon: Heart,
      path: "/notifications",
      id: "notifications",
      label: "Activity",
      isActive:
        activeItem === "notifications" ||
        location.pathname === "/notifications",
    },
    {
      icon: User,
      path: "/profile",
      id: "profile",
      label: "Profile",
      isActive:
        activeItem === "profile" ||
        location.pathname === "/profile" ||
        location.pathname.startsWith("/profile/"),
    },
  ];

  // Mobile view with search overlay
  if (showMobileSearch) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-sm bg-white min-h-screen relative shadow-xl">
          <div className="h-11 bg-white flex items-center justify-between px-6 text-black font-medium">
            <div className="text-sm font-semibold">9:41</div>
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <svg
                className="w-4 h-3 ml-1"
                viewBox="0 0 16 12"
                fill="currentColor"
              >
                <path d="M1 3h14v6H1z" />
                <path
                  d="M0 2h16v8H0z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <div className="w-6 h-3 border border-black rounded-sm bg-black"></div>
            </div>
          </div>
          <MobileSearch onBack={handleBackFromSearch} />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden flex justify-center">
        <div className="w-full max-w-sm bg-white min-h-screen relative shadow-xl">
          <div className="h-11 bg-white flex items-center justify-between px-6 text-black font-medium">
            <div className="text-sm font-semibold">9:41</div>
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <svg
                className="w-4 h-3 ml-1"
                viewBox="0 0 16 12"
                fill="currentColor"
              >
                <path d="M1 3h14v6H1z" />
                <path
                  d="M0 2h16v8H0z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <div className="w-6 h-3 border border-black rounded-sm bg-black"></div>
            </div>
          </div>
          <main className={showBottomNav ? "pb-20" : ""}>{children}</main>
          {showBottomNav && (
            <BottomNavigation
              activeItem={activeItem}
              onItemClick={handleBottomNavClick}
              userAvatar={userAvatar}
            />
          )}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Main Sidebar */}
        {showDesktopSidebar && (
          <div
            className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-all duration-300 ${
              showSearchSidebar ? "w-20" : "w-64"
            }`}
          >
            <div className="p-6">
              <h1
                className={`text-2xl font-bold transition-opacity duration-300 ${
                  showSearchSidebar ? "opacity-0" : "opacity-100"
                }`}
              >
                {!showSearchSidebar && "Instagram"}
              </h1>
              {showSearchSidebar && (
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">I</span>
                  </div>
                </div>
              )}
            </div>

            <nav className="mt-8">
              {sidebarItems.map((item, index) => {
                const IconComponent = item.icon;

                if (item.onClick) {
                  return (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`w-full flex items-center gap-4 px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                        item.isActive ? "font-semibold" : ""
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          item.isActive ? "text-black" : "text-gray-700"
                        }`}
                      />
                      {!showSearchSidebar && (
                        <span
                          className={`text-base transition-opacity duration-300 ${
                            showSearchSidebar ? "opacity-0" : "opacity-100"
                          } ${item.isActive ? "font-semibold" : ""}`}
                        >
                          {item.label}
                        </span>
                      )}
                    </button>
                  );
                }

                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition-colors ${
                      item.isActive ? "font-semibold" : ""
                    }`}
                  >
                    {item.id === "profile" ? (
                      <div
                        className={`w-6 h-6 rounded-full overflow-hidden ${
                          item.isActive
                            ? "ring-2 ring-black"
                            : "ring-1 ring-gray-300"
                        }`}
                      >
                        <img
                          src={userAvatar || "/api/placeholder/24/24"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <IconComponent
                        className={`w-6 h-6 ${
                          item.isActive ? "text-black" : "text-gray-700"
                        }`}
                      />
                    )}
                    {!showSearchSidebar && (
                      <span
                        className={`text-base transition-opacity duration-300 ${
                          showSearchSidebar ? "opacity-0" : "opacity-100"
                        } ${item.isActive ? "font-semibold" : ""}`}
                      >
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Search Sidebar */}
        <SearchSidebar
          isOpen={showSearchSidebar}
          onClose={handleSearchSidebarClose}
        />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            showDesktopSidebar
              ? showSearchSidebar
                ? "ml-96" // 20 (sidebar) + 384 (search sidebar)
                : "ml-64"
              : "ml-0"
          }`}
        >
          <main className="min-h-screen bg-white">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
