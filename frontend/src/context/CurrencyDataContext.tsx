"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CurrencyData {
  currency: string;
  date: string;
  price: number;
}
interface CurrencyContextState {
  currencyData: CurrencyData[] | null;
  isLoading: boolean;
  error: string | null;
}

const CurrencyContext = createContext({} as CurrencyContextState);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currencyData, setCurrencyData] = useState<CurrencyData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://interview.switcheo.com/prices.json")
      .then((response) => {
        setCurrencyData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching currency data");
        setIsLoading(false);
        console.error("Error fetching currency data:", error);
      });
  }, []);

  return <CurrencyContext.Provider value={{ currencyData, isLoading, error }}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  return context;
};
