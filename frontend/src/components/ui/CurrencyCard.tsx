import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import ModalWindow from "./Modal";

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
  const validationSchema = yup.object().shape({
    currentCurrencyIndex: yup.number().nullable().required("Please select a source currency"),
    targetCurrencyIndex: yup.number().nullable().required("Please select a target currency"),
  });

  const [openModalWindow, setOpenModalWindow] = useState<boolean>(false);
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState<number | null>(null);
  const [targetCurrencyIndex, setTargetCurrencyIndex] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<boolean>(false);

  const [currentVal, setCurrentVal] = useState<number>(0);
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const selectedIndex = event.target.selectedIndex - 1;
    setIndex(selectedIndex >= 0 ? selectedIndex : null);
  };

  useEffect(() => {
    const rangeInput = rangeInputRef.current;
    if (rangeInput) {
      rangeInput.addEventListener("input", (event: any) => {
        setCurrentVal(Number(event.target.value));
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
      .validate({ currentCurrencyIndex, targetCurrencyIndex })
      .then(() => {
        setValidationError(false);
      })
      .catch((error) => {
        setValidationError(true);
      });
  }, [currentCurrencyIndex, targetCurrencyIndex]);

  const calculatedPrice = currentCurrencyIndex !== null ? currencyData[currentCurrencyIndex].price * currentVal : 0;
  const targetAmount =
    targetCurrencyIndex !== null && currentCurrencyIndex !== null
      ? calculatedPrice / currencyData[targetCurrencyIndex].price
      : 0;

  const handleExchange = () => {
    if (validationError) {
      alert(validationError);
      return;
    } else {
      alert(
        `Successfully exchanged ${currentVal} units of ${
          currencyData[currentCurrencyIndex!].currency
        } to ${targetAmount.toFixed(2)} units of ${currencyData[targetCurrencyIndex!].currency}`
      );
    }
  };

  return (
    <div className="flex flex-col bg-blue-500/5 border p-[10px] rounded-lg text-black gap-[10px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-row items-center justify-between flex-wrap gap-[10px]">
          <p className="text-[25px]">{currentVal}</p>
          <select
            onChange={(event) => handleSelectChange(event, setCurrentCurrencyIndex)}
            className="bg-transparent border border-gray-300 rounded-sm px-[10px] py-[2px] text-[20px]"
          >
            <option value="">Select a currency</option>
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
            className="bg-transparent border border-gray-300 rounded-sm px-[10px] py-[2px] text-[20px]"
          >
            <option value="">Select target currency</option>
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
        <p>${calculatedPrice}</p>
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
        min="0"
        max={availableNumOfCoins}
      />
      <button
        onClick={() => {
          handleExchange;
          setOpenModalWindow(true);
        }}
        className="mt-4 bg-blue-500 hover:opacity-50 transition-all text-white px-4 py-2 rounded"
      >
        Exchange
      </button>
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
