import React, { useState } from "react";
import axios from "axios";
import './Weather.css';

function Weather() {
  const [city, setCity] = useState(""); // 城市名稱
  const [weather, setWeather] = useState({ data: null, loading: false, error: null });
  const [apiKey] = useState("a55fb9452417434bd14dd5e14ef733b7");

  const fetchWeather = async () => {
    if (!city) {
      alert("請輸入城市名稱");
      return;
    }

    setWeather({ ...weather, loading: true, error: null });

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather({ data: response.data, loading: false, error: null });
    } catch (error) {
      console.error("獲取天氣資料失敗:", error);
      setWeather({ ...weather, loading: false, error: "無法獲取天氣資料，請稍後再試" });
    }
  };

  return (
    <div className="weather-container">
      <h2>查詢天氣</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="輸入城市名稱"
      />
      <button onClick={fetchWeather}>查詢天氣</button>

      {weather.loading && <p>載入中...</p>}
      {weather.error && <p className="error-message">{weather.error}</p>}

      {weather.data && !weather.loading && !weather.error && (
        <div className="weather-info">
          <h3>{weather.data.name}</h3>
          <p>溫度: {weather.data.main.temp}°C</p>
          <p>描述: {weather.data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
