"use client";

interface RefreshButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  lastUpdated?: Date | null;
}

export default function RefreshButton({
  onClick,
  isLoading = false,
  lastUpdated = null,
}: RefreshButtonProps) {
  const formattedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <div className="flex items-center">
      {lastUpdated && (
        <span className="text-sm text-gray-500 mr-3">
          Last updated: {formattedTime}
        </span>
      )}
      <button
        onClick={onClick}
        disabled={isLoading}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Refresh
      </button>
    </div>
  );
}
