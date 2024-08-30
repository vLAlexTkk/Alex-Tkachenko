/// 1. We can use only one interface and add `formatted` as an optional field if needed, like `formatted?: string`.
/// Old Code
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
/// Updated Code
interface WalletBalance {
  currency: string;
  amount: number;
  formatted?: string;
}
///

/// 2. This Props interface is empty and can be removed. We can directly use `BoxProps` in the function if needed.
interface Props extends BoxProps {}
///

/// Double Props in function, we can use it only once, in React.FC<Props | BoxProps>... or ...= ({}:Props | BoxProps)
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /// 3. We don't need to use a separate function to choose different variants. Instead, we can define the options directly in the interface.

  /// P.S.
  // But it can still be useful to have a function that returns priorities, especially if the logic is complex or subject to change. 
  // However, if the priorities are fixed and can be defined statically, then yes, the logic can be moved 
  // to the interface or handled directly within the function.

  /// Old Code
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };
  /// Updated Code: Define the possible values in the interface:
  interface WalletBalance {
    currency: string;
    amount: number;
    formatted?: string;
    blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
  }
  /// Then, use it in the code like this:
  /// const priorityExample = balance.blockchain === "Osmosis" ? ... : ...

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99) {
          // Check if balance.amount > 0, as it makes more sense to keep those with a remaining balance.
          if (balance.amount > 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0; // Added return 0 for cases with equal priorities.
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = formattedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

/// Also, this component never exported, so we nned to add this to use
export default WalletPage
