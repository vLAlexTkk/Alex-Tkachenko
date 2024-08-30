"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ISelectedCurrency {
  selectedCurrency: string;
  selectCurrency: (currency: string) => void;
}

const SelectedCurrencyContext = createContext({} as ISelectedCurrency);

interface SelectedCurrencyProviderProps {
  children: ReactNode;
}

export const SelectedCurrencyProvider = ({ children }: SelectedCurrencyProviderProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("BTCUSDT");
  const selectCurrency = (currency = "BTCUSDT") => {
    setSelectedCurrency(currency);
  };
  return (
    <SelectedCurrencyContext.Provider value={{ selectedCurrency, selectCurrency }}>
      {children}
    </SelectedCurrencyContext.Provider>
  );
};

export const useSelectedCurrency = () => {
  const context = useContext(SelectedCurrencyContext);
  return context;
};
