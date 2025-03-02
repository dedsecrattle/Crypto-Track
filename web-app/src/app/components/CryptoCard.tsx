"use client";

import { Cryptocurrency } from "../services/api";
import Image from "next/legacy/image";

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const priceChange = crypto.price_change_percentage_24h;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 relative mr-3">
              <Image
                src={crypto.image}
                alt={crypto.name}
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{crypto.name}</h3>
              <p className="text-gray-500 uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">
              ${crypto.current_price.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                isPriceUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPriceUp ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p className="font-medium">${crypto.market_cap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Volume (24h)</p>
            <p className="font-medium">
              ${crypto.total_volume.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Price Change (24h)</p>
            <p
              className={`font-medium ${
                isPriceUp ? "text-green-500" : "text-red-500"
              }`}
            >
              ${Math.abs(crypto.price_change_24h).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Market Rank</p>
            <p className="font-medium">#{crypto.market_cap_rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
