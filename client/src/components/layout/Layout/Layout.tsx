// src/components/layout/Layout.tsx
import React from "react";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBottomNav = true }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen relative shadow-xl">
        {/* Status bar simulation */}
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

        <main className="pb-20">{children}</main>

        {showBottomNav && <BottomNavigation />}

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default Layout;
