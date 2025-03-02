"use client";

import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions?: Array<{ id: string; name: string; symbol: string }>;
  onSuggestionClick?: (suggestion: {
    id: string;
    name: string;
    symbol: string;
  }) => void;
}

export default function SearchBar({
  value,
  onChange,
  suggestions = [],
  onSuggestionClick,
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search cryptocurrencies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => {
                  if (onSuggestionClick) {
                    onSuggestionClick(suggestion);
                  } else {
                    onChange(suggestion.name);
                  }
                  setShowSuggestions(false);
                }}
              >
                <span className="font-medium">{suggestion.name}</span>
                <span className="ml-2 text-gray-500 text-sm uppercase">
                  {suggestion.symbol}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
