import { Link, useLocation } from "react-router-dom";
import { Heart, Home, MessageCircle, PlusSquare, Search, User } from "lucide-react";
import type { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/create", icon: PlusSquare, label: "Create" },
    { path: "/activity", icon: Heart, label: "Activity" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <header className="hidden lg:block border-b border-instagram-border bg-background sticky top-0 z-50">
        <div className="max-w-instagram mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl">
            Instagram
          </Link>
          
          {/* Desktop Search */}
          <div className="flex-1 max-w-xs mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-instagram-gray" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-instagram-light-gray border-0 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-instagram-border"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive ? "text-foreground" : "text-instagram-gray hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? "fill-current" : ""}`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden border-b border-instagram-border bg-background sticky top-0 z-50">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl">
            Instagram
          </Link>
          <div className="flex items-center space-x-4">
            <Heart className="h-6 w-6 text-instagram-gray" />
            <MessageCircle className="h-6 w-6 text-instagram-gray" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16 lg:pb-0">
        <div className="lg:max-w-instagram lg:mx-auto lg:flex lg:gap-8 lg:px-4 lg:pt-8">
          {/* Desktop Sidebar (optional - can be added later) */}
          
          {/* Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-instagram-border">
        <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex items-center justify-center py-3 ${
                  isActive ? "text-foreground" : "text-instagram-gray"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "fill-current" : ""}`} />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
