import React, { useCallback, useEffect, useState } from "react";

import Currency from "./Currency";
import Input from "./Input";
import Select from "./Select";
import Title from "./Title";
import axios from "axios";
import config from "../config";

import "./currency-coverter.css";

const CurrencyConverter = () => {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("BRL");
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<null | number>(null);

  const handleAmount = useCallback((ev: React.FormEvent<HTMLInputElement>) => {
    if (ev.currentTarget.value) {
      setAmount(parseFloat(ev.currentTarget.value));
    }
  }, []);

  const handleFromCurrency = useCallback(
    (ev: React.FormEvent<HTMLSelectElement>) => {
      if (ev.currentTarget.value) {
        setFromCurrency(ev.currentTarget.value);
      }
    },
    []
  );

  const handleToCurrency = useCallback(
    (ev: React.FormEvent<HTMLSelectElement>) => {
      if (ev.currentTarget.value) {
        setToCurrency(ev.currentTarget.value);
      }
    },
    []
  );

  useEffect(() => {
    axios
      .get(config.API_URL)
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.log("Ocorreu um erro: ", error);
      });
  }, []);

  useEffect(() => {
    if (rates) {
      const rateFrom = rates[fromCurrency] || 0;
      const rateTo = rates[toCurrency] || 0;

      setConvertedAmount((amount / rateFrom) * rateTo);
    }
  }, [amount, rates, fromCurrency, toCurrency]);

  if (!rates) {
    return <h1>Carregando...</h1>;
  }

  return (
    <main className="converter">
      <Title />
      <Input
        value={amount}
        onChange={(ev: React.FormEvent<HTMLInputElement>) => {
          handleAmount(ev);
        }}
      />
      <Select
        label="From Currency"
        id="main-currency"
        rates={rates}
        value={fromCurrency}
        onChange={(ev: React.FormEvent<HTMLSelectElement>) =>
          handleFromCurrency(ev)
        }
      />
      <Currency amount={amount} currency={fromCurrency} />
      <Select
        label="To Currency"
        onChange={(ev: React.FormEvent<HTMLSelectElement>) => {
          handleToCurrency(ev);
        }}
        id="convert-currency"
        rates={rates}
        value={toCurrency}
      />
      <Currency amount={convertedAmount} currency={toCurrency} />
    </main>
  );
};

export default CurrencyConverter;
