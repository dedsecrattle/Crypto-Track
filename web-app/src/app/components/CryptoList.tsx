"use client";

import { Cryptocurrency } from "../services/api";
import CryptoCard from "./CryptoCard";
import CryptoTable from "./CryptoTable";
import { useState, useEffect } from "react";

interface CryptoListProps {
  cryptocurrencies: Cryptocurrency[];
}

export default function CryptoList({ cryptocurrencies }: CryptoListProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">("table");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setViewMode("card");
    }
  }, [isMobile]);

  return (
    <div>
      {/* View mode toggle (only on desktop) */}
      {!isMobile && (
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                viewMode === "table"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Table View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                viewMode === "card"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Card View
            </button>
          </div>
        </div>
      )}

      {/* Show appropriate view based on viewMode */}
      {viewMode === "table" ? (
        <CryptoTable cryptocurrencies={cryptocurrencies} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptocurrencies.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}

      {/* Show message if no cryptocurrencies match search */}
      {cryptocurrencies.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No cryptocurrencies found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
