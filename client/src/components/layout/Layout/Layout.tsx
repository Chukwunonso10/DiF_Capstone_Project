import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import BottomNavigation from "./BottomNavigation";
import SearchSidebar from "../../common/SearchSidebar";

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
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSidebarToggle = () => {
    setShowSearchSidebar(!showSearchSidebar);
  };

  const handleSearchSidebarClose = () => {
    setShowSearchSidebar(false);
  };

  const handleBottomNavClick = (item: string) => {
    if (item === "search") {
      navigate("/search");
    }
    onItemClick?.(item);
  };

  useEffect(() => {
    setShowSearchSidebar(false);
  }, [location.pathname]);

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

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="hidden lg:block">
        {showDesktopSidebar && (
          <>
            <div
              className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-all duration-300 ease-out ${
                showSearchSidebar ? "w-20" : "w-80"
              }`}
            >
              <div className="p-8 border-b border-gray-200">
                {showSearchSidebar ? (
                  <div className="flex justify-center">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                ) : (
                  <h1
                    className="text-3xl font-normal transition-opacity duration-300"
                    style={{ fontFamily: "Billabong, cursive" }}
                  >
                    Instagram
                  </h1>
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
                        className={`w-full flex items-center gap-4 px-8 py-3 text-left hover:bg-gray-100 transition-all duration-200 rounded-lg mx-4 ${
                          item.isActive ? "font-semibold bg-gray-100" : ""
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 transition-transform duration-200 ${
                            item.isActive
                              ? "text-black scale-110"
                              : "text-gray-700"
                          }`}
                        />
                        {!showSearchSidebar && (
                          <span
                            className={`text-lg transition-opacity duration-300 ${
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
                      className={`flex items-center gap-4 px-8 py-3 hover:bg-gray-100 transition-all duration-200 rounded-lg mx-4 ${
                        item.isActive ? "font-semibold bg-gray-100" : ""
                      }`}
                    >
                      {item.id === "profile" ? (
                        <div
                          className={`w-6 h-6 rounded-full overflow-hidden transition-transform duration-200 ${
                            item.isActive
                              ? "ring-2 ring-black scale-110"
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
                          className={`w-6 h-6 transition-transform duration-200 ${
                            item.isActive
                              ? "text-black scale-110"
                              : "text-gray-700"
                          }`}
                        />
                      )}
                      {!showSearchSidebar && (
                        <span
                          className={`text-lg transition-opacity duration-300 ${
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

            <SearchSidebar
              isOpen={showSearchSidebar}
              onClose={handleSearchSidebarClose}
            />
          </>
        )}

        <div
          className={`transition-all duration-300 ease-out ${
            showDesktopSidebar
              ? showSearchSidebar
                ? "ml-100"
                : "ml-80"
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
