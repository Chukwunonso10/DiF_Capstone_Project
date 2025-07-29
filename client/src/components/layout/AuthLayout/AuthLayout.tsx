import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-6 py-4">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>

      {/* Bottom Indicator */}
      <div className="pb-4 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
