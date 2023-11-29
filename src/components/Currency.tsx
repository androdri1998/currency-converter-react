interface CurrencyProps {
  amount: number | null;
  currency: string;
}

const Currency = ({ amount, currency }: CurrencyProps) => {
  return (
    <p>
      {currency} {amount ? amount.toFixed(2) : "0.00"}
    </p>
  );
};

export default Currency;
