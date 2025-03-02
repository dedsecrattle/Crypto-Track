"use client";

import { Cryptocurrency } from "../services/api";
import Image from "next/image";

interface CryptoTableProps {
  cryptocurrencies: Cryptocurrency[];
}

export default function CryptoTable({ cryptocurrencies }: CryptoTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h %
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Market Cap
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Volume (24h)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cryptocurrencies.map((crypto) => {
            // Determine if price has increased or decreased
            const priceChange = crypto.price_change_percentage_24h;
            const isPriceUp = priceChange >= 0;

            return (
              <tr key={crypto.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-500">
                  {crypto.market_cap_rank}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 relative">
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {crypto.name}
                      </div>
                      <div className="text-sm text-gray-500 uppercase">
                        {crypto.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-right text-gray-900 font-medium">
                  ${crypto.current_price.toLocaleString()}
                </td>
                <td
                  className={`py-4 px-4 text-sm text-right font-medium ${
                    isPriceUp ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPriceUp ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
                </td>
                <td className="py-4 px-4 text-sm text-right text-gray-500">
                  ${crypto.market_cap.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-sm text-right text-gray-500 hidden md:table-cell">
                  ${crypto.total_volume.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
