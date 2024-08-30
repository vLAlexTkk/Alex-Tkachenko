"use client";

import { useCurrency } from "@/context/CurrencyDataContext";

import Button from "@/components/ui/Button";
import CoinChart from "@/components/ui/Charts";
import CurrencyCard from "@/components/ui/CurrencyCard";
import { useSelectedCurrency } from "@/context/SelectedCurrencyChart";

function CurrencySwap() {
  const { currencyData } = useCurrency();
  const { selectedCurrency } = useSelectedCurrency();
  return (
    <section className="bg-blue-500/5 lg:px-[40px] lg:py-[40px] py-[20px] px-[20px]">
      <h2 className="text-black text-[25px] dark:text-white font-semibold">Swap</h2>
      <div className="flex flex-row gap-[10px] mt-[10px]">
        <Button text="swap" iconPath={"/icons/swap.svg"} />
        <Button text="limit order" iconPath={"/icons/chart-pie.svg"} />
      </div>
      <div className="flex flex-row mt-[40px] p-[20px] items-center flex-wrap justify-between gap-[10px]">
        <div className="w-full bg-white dark:border dark:bg-black rounded-lg p-[10px] shadow-lg lg:max-w-[30%]">
          <CurrencyCard currencyData={currencyData as any} availableNumOfCoins={20} />
        </div>
        <div className="w-full bg-white dark:bg-black dark:border p-[20px] rounded-lg shadow-lg lg:max-w-[60%]">
          <div className="flex flex-row items-baseline gap-[10px]">
            <h2 className="text-black mb-[10px] text-[25px] font-semibold dark:text-white">{selectedCurrency}</h2>
            <p className="text-blue-500 text-[12px]">+0.06% today</p>
          </div>
          <div style={{ width: "100%", height: 500 }}>
            <CoinChart />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrencySwap;
