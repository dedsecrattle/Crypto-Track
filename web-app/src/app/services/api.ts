export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  total_volume: number;
}

/**
 * Fetches cryptocurrency price data from the CoinGecko API
 * @param ids Comma-separated list of cryptocurrency IDs to fetch
 * @returns Array of cryptocurrency data objects
 */
export async function fetchCryptoPrices(
  ids = "bitcoin,ethereum,ripple,cardano,solana"
): Promise<Cryptocurrency[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    throw error;
  }
}

/**
 * Fetches a list of all available cryptocurrencies for search functionality
 * @returns Array of cryptocurrency objects with id, name, and symbol
 */
export async function fetchCryptoList(): Promise<
  { id: string; name: string; symbol: string }[]
> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/coins/list`,
      {
        next: { revalidate: 3600 }, // Cache for an hour
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto list:", error);
    throw error;
  }
}
