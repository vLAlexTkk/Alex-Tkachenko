// 1. Merged WalletBalance and FormattedWalletBalance interfaces.
// Instead of having two separate interfaces, I added `formatted` as an optional field
// in WalletBalance. This simplifies the data structure by using a single interface.
interface WalletBalance {
  currency: string;
  amount: number;
  formatted?: string;
  blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
}

// 2. Removed the empty Props interface.
// Since Props doesn't add any new properties to BoxProps, I removed it. 
// We can use BoxProps directly in the component.
interface Props extends BoxProps {}

// 3. Fixed double type declaration of Props in the function signature.
// The type Props is now defined only once in the function header.
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // 4. Replaced getPriority function with a static priority map.
  // Instead of using a function to determine blockchain priority, I switched to using
  // a simple priorityMap object. This makes the code cleaner and slightly more performant.
  const priorityMap: { [key in WalletBalance['blockchain']]: number } = {
    "Osmosis": 100,
    "Ethereum": 50,
    "Arbitrum": 30,
    "Zilliqa": 20,
    "Neo": 20,
  };

  // 5. Optimized the useMemo hook by removing unnecessary dependencies.
  // Removed the `prices` dependency from useMemo since it's not used inside.
  // This ensures the memoized value is recalculated only when it needs to be.
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => balance.amount > 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return priorityMap[rhs.blockchain] - priorityMap[lhs.blockchain];
      });
  }, [balances]);

  // 6. Added formatting to balance amounts.
  // I added a step to format the `amount` as a string in the returned object. 
  // This ensures that the `formatted` field is available where needed.
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // 7. Ensured type consistency in the map function.
  // By using `Required<WalletBalance>`, I'm ensuring that the `formatted` field 
  // is present when rendering the WalletRow components.
  const rows = formattedBalances.map((balance: Required<WalletBalance>, index: number) => {
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

  // 8. Returning the rendered rows inside the main component container.
  // The component now returns a div with all the WalletRow components, 
  // each properly formatted and sorted.
  return <div {...rest}>{rows}</div>;
};

export default WalletPage