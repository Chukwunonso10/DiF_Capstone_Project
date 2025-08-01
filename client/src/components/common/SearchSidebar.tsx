import React, { useState } from "react";
import { X, Search } from "lucide-react";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
  followers?: string;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock search results
  const recentSearches: SearchResult[] = [
    {
      id: "1",
      username: "pastorjerryjames",
      displayName: "Jeremiah James",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true,
      followers: "2,613 followers",
    },
  ];

  const handleClearAll = () => {
    // Logic to clear all recent searches
    console.log("Clear all searches");
  };

  const handleRemoveSearch = (id: string) => {
    // Logic to remove specific search
    console.log("Remove search:", id);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    console.log("Navigate to:", result.username);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-full max-w-sm lg:max-w-md lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
        ${isOpen ? "lg:block" : "lg:hidden"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Search</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Recent Searches */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Recent</h3>
              <button
                onClick={handleClearAll}
                className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Clear all
              </button>
            </div>

            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={result.avatar}
                        alt={result.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-gray-900 truncate">
                          {result.username}
                        </span>
                        {result.verified && (
                          <svg
                            className="w-4 h-4 text-blue-500 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C13.1 2 14 2.9 14 4V6.1L16.9 6.6C17.8 6.7 18.5 7.5 18.5 8.4V10.3L20.8 11.9C21.6 12.4 22 13.4 21.7 14.3L20.7 16.9L21.7 19.4C22 20.3 21.6 21.3 20.8 21.8L18.5 23.4V25.6C18.5 26.5 17.8 27.3 16.9 27.4L14 27.9V30C14 31.1 13.1 32 12 32S10 31.1 10 30V27.9L7.1 27.4C6.2 27.3 5.5 26.5 5.5 25.6V23.4L3.2 21.8C2.4 21.3 2 20.3 2.3 19.4L3.3 16.9L2.3 14.3C2 13.4 2.4 12.4 3.2 11.9L5.5 10.3V8.4C5.5 7.5 6.2 6.7 7.1 6.6L10 6.1V4C10 2.9 10.9 2 12 2M10.9 16.5L7.5 13.1L6.1 14.5L10.9 19.3L17.9 12.3L16.5 10.9L10.9 16.5Z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {result.displayName} • {result.followers}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSearch(result.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-full transition-all"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No recent searches</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
