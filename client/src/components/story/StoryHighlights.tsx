import React from "react";
import { Plus } from "lucide-react";

interface StoryHighlight {
  id: string;
  title: string;
  image: string;
}

interface StoryHighlightsProps {
  highlights: StoryHighlight[];
  canAddNew?: boolean;
  onAddNew?: () => void;
  onHighlightClick?: (highlight: StoryHighlight) => void;
}

const StoryHighlights: React.FC<StoryHighlightsProps> = ({
  highlights,
  canAddNew = false,
  onAddNew,
  onHighlightClick,
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {canAddNew && (
        <div className="flex-shrink-0 text-center">
          <button
            onClick={onAddNew}
            className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2 hover:border-gray-400 transition-colors"
          >
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
          <span className="text-xs text-gray-600">New</span>
        </div>
      )}

      {highlights.map((highlight) => (
        <div key={highlight.id} className="flex-shrink-0 text-center">
          <button
            onClick={() => onHighlightClick?.(highlight)}
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-2 hover:border-gray-300 transition-colors"
          >
            <img
              src={highlight.image}
              alt={highlight.title}
              className="w-full h-full object-cover"
            />
          </button>
          <span className="text-xs text-gray-600 truncate max-w-16 block">
            {highlight.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoryHighlights;
