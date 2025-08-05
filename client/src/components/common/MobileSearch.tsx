import React, { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

interface MobileSearchProps {
  onBack: () => void;
}

interface SearchResult {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
  followers?: string;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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

  const searchResults: SearchResult[] = [
    {
      id: "2",
      username: "john_doe",
      displayName: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      followers: "1,234 followers",
    },
    {
      id: "3",
      username: "jane_smith",
      displayName: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      verified: true,
      followers: "5,678 followers",
    },
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearching(value.length > 0);
  };

  const handleClearAll = () => {
    console.log("Clear all searches");
  };

  const handleResultClick = (result: SearchResult) => {
    console.log("Navigate to:", result.username);
  };

  const resultsToShow = isSearching ? searchResults : recentSearches;

  return (
    <div className="h-full bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none text-sm"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!isSearching && (
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Recent</h3>
              <button
                onClick={handleClearAll}
                className="text-blue-500 text-sm font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {resultsToShow.length > 0 ? (
          <div className="px-4">
            {resultsToShow.map((result) => (
              <div
                key={result.id}
                className="flex items-center gap-3 py-3 cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={result.avatar}
                    alt={result.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold text-sm text-gray-900 truncate">
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
                  <p className="text-sm text-gray-500 truncate">
                    {result.displayName} • {result.followers}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isSearching ? "No results found" : "No recent searches"}
              </h3>
              <p className="text-gray-500 text-sm">
                {isSearching
                  ? "Try searching for something else"
                  : "Your recent searches will appear here"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
