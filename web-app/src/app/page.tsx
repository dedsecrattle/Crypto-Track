"use client";

import { useCryptoPrices, useCryptoSearch } from "./hooks/useCrypto";
import SearchBar from "./components/SearchBar";
import RefreshButton from "./components/RefreshButton";
import LoadingIndicator from "./components/LoadingIndicator";
import CryptoList from "./components/CryptoList";

export default function Home() {
  const { data, isLoading, isError, error, refreshData, lastUpdated } =
    useCryptoPrices();

  const { searchTerm, setSearchTerm, filterCryptos, suggestions } =
    useCryptoSearch();

  const filteredCryptos = data ? filterCryptos(data) : [];

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crypto Price Tracker
          </h1>
          <p className="text-gray-600">
            Track cryptocurrency prices in real-time.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              suggestions={suggestions}
            />
            <RefreshButton
              onClick={refreshData}
              isLoading={isLoading}
              lastUpdated={lastUpdated}
            />
          </div>

          {isLoading && !data ? (
            <LoadingIndicator />
          ) : isError ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">
              <p>Error loading cryptocurrency data:</p>
              <p className="text-sm">{error?.message || "Unknown error"}</p>
              <button
                onClick={refreshData}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <CryptoList cryptocurrencies={filteredCryptos} />
          )}
        </div>
      </div>
    </main>
  );
}
