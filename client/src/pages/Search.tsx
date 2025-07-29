import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

const exploreImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=400&h=400&fit=crop",
    type: "image"
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&fit=crop",
    type: "image"
  }
];

const categories = ["IGTV", "Shop", "Style", "Sports", "Auto"];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("IGTV");

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile Search Bar */}
      <div className="lg:hidden p-4 border-b border-instagram-border">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-instagram-gray" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-instagram-light-gray border-0 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-instagram-border"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-instagram-border bg-background sticky top-14 lg:top-16 z-40">
        <div className="flex space-x-6 px-4 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeCategory === category
                  ? "text-instagram-text border-instagram-text"
                  : "text-instagram-gray border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="p-0.5">
        <div className="grid grid-cols-3 gap-0.5">
          {exploreImages.map((image) => (
            <div key={image.id} className="aspect-square relative group cursor-pointer">
              <img
                src={image.src}
                alt="Explore"
                className="w-full h-full object-cover"
              />
              {/* Overlay for hover effects on desktop */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 hidden lg:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
