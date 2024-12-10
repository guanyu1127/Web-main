import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import CalendarPage from "./pages/CalendarPage";
import MapPage from "./pages/MapPage";
import "./App.css"; // 引入全局樣式

function App() {
  const [events, setEvents] = useState([]); // 用於管理事件的狀態

  return (
    <Router>
      <div className="container">
        <header>
          <h1>國際旅遊助手</h1>
          <p>探索我們的功能，讓您的旅行更便利：</p>
        </header>

        {/* 頂部導航欄 */}
        <nav>
          <Link to="/" className="nav-link">首頁</Link>
          <Link to="/weather" className="nav-link">天氣</Link>
          <Link to="/currency-converter" className="nav-link">匯率轉換</Link>
          <Link to="/calendar" className="nav-link">日曆</Link>
          <Link to="/map" className="nav-link">地圖</Link>
        </nav>

        {/* 頁面內容區域 */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/currency-converter" element={<CurrencyConverterPage />} />
            <Route path="/calendar" element={<CalendarPage events={events} setEvents={setEvents} />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// 首頁元件
const Home = () => (
  <div>
    <h2>歡迎來到國際旅遊助手！</h2>
    <p>請選擇上方功能以開始使用。</p>
  </div>
);

export default App;
