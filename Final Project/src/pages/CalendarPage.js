import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css"; // 確保載入自定義樣式

const CalendarComponent = ({ events = [], setEvents }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const existingEvent = events.find(
      (event) => event.date.toDateString() === date.toDateString()
    );
    if (existingEvent) {
      setEventName(existingEvent.title);
      setEventTime(existingEvent.time);
    } else {
      setEventName("");
      setEventTime("");
    }
  };

  const addEvent = () => {
    if (selectedDate && eventName && eventTime) {
      const newEvent = {
        date: new Date(selectedDate),
        time: eventTime,
        title: eventName,
      };

      const updatedEvents = [...events, newEvent].sort((a, b) => a.date - b.date);
      setEvents(updatedEvents);

      setEventName("");
      setEventTime("");
    } else {
      alert("請確保選擇日期、輸入事件名稱和時間！");
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">日曆</h2>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileClassName={({ date }) =>
          date.toDateString() === selectedDate?.toDateString()
            ? "selected-date"
            : null
        }
      />

      {selectedDate && (
        <div className="selected-date-section">
          <h3 className="selected-date-display">
            選擇的日期: {selectedDate.toDateString()}
          </h3>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="新增事件名稱"
          />
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
          <button onClick={addEvent}>新增事件</button>
        </div>
      )}

      <div className="event-list-section">
        <h3 className="event-list-title">事件列表</h3>
        {events.length > 0 ? (
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                {event.date.toDateString()} {event.time} - {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">目前沒有任何事件。</p>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
