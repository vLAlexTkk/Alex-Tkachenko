import Image from "next/image";

import React, { useState, useEffect, useRef } from "react";
import * as yup from "yup";

import ModalWindow from "@/components/ui/Modal";
import { useSelectedCurrency } from "@/context/SelectedCurrencyChart";

interface CurrencyData {
  currency: string;
  date: string;
  price: number;
}

interface ICurrencyCard {
  currencyData: CurrencyData[];
  availableNumOfCoins: number;
}

const CurrencyCard: React.FC<ICurrencyCard> = ({ currencyData, availableNumOfCoins }) => {
  const { selectCurrency, selectedCurrency } = useSelectedCurrency();
  const validationSchema = yup.object().shape({
    currentCurrencyIndex: yup.number().nullable().required("Please select a source currency"),
    targetCurrencyIndex: yup.number().nullable().required("Please select a target currency"),
    range: yup
      .number()
      .required("This range is required")
      .min(1, `Range must be at least 1`)
      .max(availableNumOfCoins, `Range cannot exceed ${availableNumOfCoins}`),
  });

  const [openModalWindow, setOpenModalWindow] = useState<boolean>(false);
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState<number | null>(null);
  const [targetCurrencyIndex, setTargetCurrencyIndex] = useState<number | null>(null);
  const [range, setRange] = useState<number>(1);
  const [validationError, setValidationError] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentVal, setCurrentVal] = useState<number>(1);
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const selectedIndex = event.target.selectedIndex - 1;
    setIndex(selectedIndex >= 0 ? selectedIndex : null);
  };

  setTimeout(() => {
    if (isLoading) {
      setOpenModalWindow(true);
    }
  }, 1000);

  setTimeout(() => {
    if (openModalWindow) {
      setIsLoading(false);
    }
  }, 0);

  useEffect(() => {
    const rangeInput = rangeInputRef.current;
    if (rangeInput) {
      rangeInput.addEventListener("input", (event: any) => {
        const value = Number(event.target.value);
        setCurrentVal(value);
        setRange(value);
      });
    }
    return () => {
      if (rangeInput) {
        rangeInput.removeEventListener("input", () => {});
      }
    };
  }, []);

  useEffect(() => {
    validationSchema
      .validate({ currentCurrencyIndex, targetCurrencyIndex, range })
      .then(() => {
        setValidationError(false);
        setValidationMessage("");
      })
      .catch((error) => {
        setValidationError(true);
        setValidationMessage(error.message);
      });
  }, [currentCurrencyIndex, targetCurrencyIndex, range]);

  const calculatedPrice = currentCurrencyIndex !== null ? currencyData[currentCurrencyIndex].price * currentVal : 0;
  const targetAmount =
    targetCurrencyIndex !== null && currentCurrencyIndex !== null
      ? calculatedPrice / currencyData[targetCurrencyIndex].price
      : 0;

  const handleExchange = () => {
    if (validationError) {
      setValidationError(true);
      return;
    } else {
      setValidationError(false);
    }
  };

  return (
    <div
      onMouseMove={() => selectCurrency(currencyData[currentCurrencyIndex!]?.currency)}
      className="flex flex-col bg-blue-500/5 border p-[10px] rounded-lg text-black dark:text-white  gap-[10px]"
    >
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-row items-center justify-between flex-wrap gap-[10px]">
          <p className="text-[25px]">{currentVal}</p>
          <select
            onChange={(event) => handleSelectChange(event, setCurrentCurrencyIndex)}
            className="bg-transparent border max-w-[200px]  border-gray-300 rounded-sm px-[10px] py-[2px] text-[20px]"
          >
            <option>Select a currency</option>
            {currencyData?.map((item, index) => (
              <option key={index} value={item.currency}>
                {item.currency}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Image src={"/icons/convert-shapes.svg"} width={20} height={20} alt="logo" />
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap gap-[10px]">
          <select
            onChange={(event) => handleSelectChange(event, setTargetCurrencyIndex)}
            className="bg-transparent max-w-[200px] border border-gray-300 rounded-sm px-[10px] py-[2px] text-[20px]"
          >
            <option>Select target currency</option>
            {currencyData?.map((item, index) => (
              <option key={index} value={item.currency}>
                {item.currency}
              </option>
            ))}
          </select>
          <p className="text-[25px]">{targetAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex text-gray-400 text-[12px] flex-row items-center justify-between gap-[10px]">
        <p>${calculatedPrice.toFixed(2)}</p>
        <p className="flex gap-[2px]">
          Balance: {availableNumOfCoins}
          {currentVal === availableNumOfCoins && <span>MAX</span>}
        </p>
      </div>
      <input
        type="range"
        id="available_currency"
        name="vol"
        ref={rangeInputRef}
        step={1}
        min="1"
        max={availableNumOfCoins}
        value={currentVal}
        onChange={(event) => {
          setCurrentVal(Number(event.target.value));
          setRange(Number(event.target.value));
        }}
      />
      {validationError && <p className="text-red-500 text-sm mt-2">{validationMessage}</p>}
      <button
        onClick={() => {
          handleExchange();
          setIsLoading(true);
        }}
        className="mt-4 bg-blue-500 flex gap-[10px] flex-row items-center justify-center dark:bg-black dark:border dark:border-white hover:opacity-50 transition-all text-white px-4 py-2 rounded"
      >
        {isLoading ? "Loading..." : "Trade"}
        {isLoading && (
          <Image
            src={"/icons/rotate-right-loading.svg"}
            className=" animate-spin"
            width={15}
            height={16}
            alt="loading"
          />
        )}
      </button>
      <div className="text-gray-400 w-full border-t border-b text-[12px] max-w-[350px] mx-auto mt-[3%] flex flex-col gap-[10px]">
        <div className="flex flex-row px-[10px] pt-[10px] items-center justify-between w-full gap-[20px]">
          <p>Swap Fee</p>
          <p>$10</p>
        </div>
        <div className="border-t" />
        <div className="flex flex-row px-[10px] pb-[0px] mx-auto items-center justify-between w-full gap-[20px]">
          <p>Price Impact</p>
          <p>0.1%({(calculatedPrice.toFixed(2) as any) % 0.1})</p>
        </div>
        <div className="border-t" />
        <div className="flex flex-row px-[10px] pb-[10px] mx-auto items-center justify-between w-full gap-[20px]">
          <p>Max deviation</p>
          <p>5%(${(calculatedPrice.toFixed(2) as any) % 5})</p>
        </div>
      </div>
      {openModalWindow && (
        <ModalWindow
          isOpen={openModalWindow}
          currencyData={currencyData}
          currentCurrencyIndex={currentCurrencyIndex}
          targetCurrencyIndex={targetCurrencyIndex}
          targetAmount={targetAmount}
          currentVal={currentVal}
          isError={validationError}
          setOpen={setOpenModalWindow}
        />
      )}
    </div>
  );
};

export default CurrencyCard;
