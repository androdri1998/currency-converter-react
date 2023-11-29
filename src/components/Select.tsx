interface SelectProps {
  id: string;
  rates: { [key: string]: number };
  value: string;
  onChange: (ev: React.FormEvent<HTMLSelectElement>) => void;
  label: string;
}

const Select = ({ id, rates, value, onChange, label }: SelectProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
