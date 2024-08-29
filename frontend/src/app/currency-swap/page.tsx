"use client";

import { useCurrency } from "@/context/CurrencyDataContext";

import Button from "@/components/ui/Button";
import CoinChart from "@/components/ui/Charts";
import CurrencyCard from "@/components/ui/CurrencyCard";

function CurrencySwap() {
  const { currencyData } = useCurrency();
  return (
    <section className="bg-blue-500/5 lg:px-[40px] lg:py-[40px] py-[20px] px-[20px]">
      <h2 className="text-black text-[25px] font-semibold">Swap</h2>
      <div className="flex flex-row gap-[10px] mt-[10px]">
        <Button text="swap" iconPath={"/icons/swap.svg"} />
        <Button text="limit order" iconPath={"/icons/chart-pie.svg"} />
      </div>
      <div className="flex flex-row mt-[40px] p-[20px] items-center flex-wrap justify-between gap-[10px]">
        <div className="w-full bg-white rounded-lg p-[10px] shadow-lg lg:max-w-[30%]">
          <CurrencyCard currencyData={currencyData as any} availableNumOfCoins={20} />
          <div className="text-gray-400  border-t border-b text-[12px] max-w-[350px] mx-auto mt-[3%] flex flex-col gap-[10px]">
            <div className="flex flex-row px-[10px] pt-[10px] items-center justify-between w-full gap-[20px]">
              <p>Swap Fee</p>
              <p>$10</p>
            </div>
            <div className="border-t" />
            <div className="flex flex-row px-[10px] pb-[0px] mx-auto items-center justify-between w-full gap-[20px]">
              <p>Price Impact</p>
              <p>0.1%</p>
            </div>
            <div className="border-t" />
            <div className="flex flex-row px-[10px] pb-[10px] mx-auto items-center justify-between w-full gap-[20px]">
              <p>Max deviation</p>
              <p>5%</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-[20px] rounded-lg shadow-lg lg:max-w-[60%]">
          <div style={{ width: "100%", height: 500 }}>
            <CoinChart />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrencySwap;
