import Image from "next/image";

interface IModalProps {
  isOpen: boolean;
  setOpen: any;
  isError: boolean;
  currentVal: number;
  currencyData: any;
  currentCurrencyIndex: any;
  targetCurrencyIndex: any;
  targetAmount: any;
}

const ModalWindow = ({
  isOpen,
  setOpen,
  isError,
  currentVal,
  currencyData,
  currentCurrencyIndex,
  targetCurrencyIndex,
  targetAmount,
}: IModalProps) => {
  return (
    <>
      {isOpen && (
        <>
          {!isError ? (
            <section className="z-[100000]">
              <div className="bg-white w-[90%] flex flex-col gap-[10px] p-[20px] items-center justify-center rounded-lg lg:w-[30%] left-[4%] lg:left-[35%] absolute z-10 mx-auto top-[30%]">
                <Image src={"/icons/octagon-check.svg"} width={60} height={60} alt="attention" />
                <h2 className="font-bold text-green-700">Success!</h2>
                <p className="text-center !text-black py-[10px]">
                  Successfully exchanged <b>{currentVal}</b> units of{" "}
                  <b>{currencyData[currentCurrencyIndex!].currency}</b> to <b>{targetAmount.toFixed(2)}</b> units of{" "}
                  <b>{currencyData[targetCurrencyIndex!].currency}</b>
                </p>
                <button
                  className="bg-blue-500/50 rounded-lg hover:scale-90 transition-transform w-full py-[10px] px-[20px] text-white"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="fixed bg-black/50 top-0 left-0 w-full h-full" />
            </section>
          ) : (
            <section className="z-[10000]">
              <div className="bg-white w-[90%] flex flex-col gap-[10px] p-[20px] items-center justify-center rounded-lg lg:w-[30%] left-[4%] lg:left-[35%] absolute z-10 mx-auto top-[30%]">
                <Image src={"/icons/exclamation.svg"} width={60} height={60} alt="attention" />
                <h2 className="font-bold text-red-700">Attention!</h2>
                <p className="text-center !text-black  py-[10px]">
                  <b>Currency</b> and <b>Target Currency</b> <br /> fields is required
                </p>
                <button
                  className="bg-blue-500/50 rounded-lg hover:scale-90 transition-transform w-full py-[10px] px-[20px] text-white"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="fixed bg-black/50 top-0 left-0 w-full h-full" />
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ModalWindow;
