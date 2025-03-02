"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCryptoPrices,
  fetchCryptoList,
  Cryptocurrency,
} from "../services/api";
import { useState, useEffect, useCallback } from "react";

export function useCryptoPrices() {
  const queryClient = useQueryClient();

  const query = useQuery<Cryptocurrency[], Error>({
    queryKey: ["cryptoPrices"],
    queryFn: () => fetchCryptoPrices(),
  });

  const refreshData = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ["cryptoPrices"] });
  }, [queryClient]);

  return {
    ...query,
    refreshData,
    lastUpdated: query.dataUpdatedAt ? new Date(query.dataUpdatedAt) : null,
  };
}

export function useCryptoSearch(initialValue = "") {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);

  const { data: cryptoList } = useQuery({
    queryKey: ["cryptoList"],
    queryFn: fetchCryptoList,
    staleTime: Infinity,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filterCryptos = useCallback(
    (cryptos: Cryptocurrency[]) => {
      if (!debouncedTerm) return cryptos;

      return cryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(debouncedTerm.toLowerCase())
      );
    },
    [debouncedTerm]
  );

  const suggestions = useCallback(() => {
    if (!debouncedTerm || !cryptoList) return [];

    return cryptoList
      .filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(debouncedTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [debouncedTerm, cryptoList]);

  return {
    searchTerm,
    setSearchTerm,
    filterCryptos,
    suggestions: suggestions(),
  };
}
