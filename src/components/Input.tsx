import React from "react";

interface InputProps {
  value: number;
  onChange: (ev: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({ onChange, value }: InputProps) => {
  return (
    <>
      <label htmlFor="value-currency">Value</label>
      <input
        value={value}
        onChange={onChange}
        id="value-currency"
        type="number"
        placeholder="Type value..."
      />
    </>
  );
};

export default Input;
