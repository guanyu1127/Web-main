import React, { useState } from "react";
import axios from "axios";
import './CurrencyConverter.css';

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TWD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const rate = response.data.rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (error) {
      console.error("貨幣轉換錯誤:", error);
    }
  };

  const currencyOptions = [
    { code: "USD", name: "美元 (USD)" },
    { code: "EUR", name: "歐元 (EUR)" },
    { code: "JPY", name: "日圓 (JPY)" },
    { code: "GBP", name: "英鎊 (GBP)" },
    { code: "AUD", name: "澳幣 (AUD)" },
    { code: "CAD", name: "加幣 (CAD)" },
    { code: "CHF", name: "瑞士法郎 (CHF)" },
    { code: "CNY", name: "人民幣 (CNY)" },
    { code: "HKD", name: "港幣 (HKD)" },
    { code: "TWD", name: "新台幣 (TWD)" },
    { code: "SGD", name: "新加坡元 (SGD)" },
    { code: "KRW", name: "韓圓 (KRW)" },
    { code: "INR", name: "印度盧比 (INR)" },
  ];

  return (
    <div className="currency-converter">
      <h2>貨幣轉換</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="輸入金額"
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencyOptions.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencyOptions.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
      <button onClick={convertCurrency}>轉換</button>

      {convertedAmount && (
        <p>轉換後金額: {convertedAmount} {toCurrency}</p>
      )}
    </div>
  );
}

export default CurrencyConverter;
