"use client";

import React, { useState } from "react";
import useEvents from "../hooks/useEvents";
import Link from "next/link";
import "./calendar.css";

const Calendar = () => {
  const { events } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const [weekDays, setWeekDays] = useState(getWeekDays(currentDate));

  const handlePrevWeek = () => {
    const prevWeek = new Date(weekDays[0]);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeekDays(getWeekDays(prevWeek));
    setCurrentDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekDays[6]);
    nextWeek.setDate(nextWeek.getDate() + 1);
    setWeekDays(getWeekDays(nextWeek));
    setCurrentDate(nextWeek);
  };

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const eventsByDate = events.reduce((acc, event) => {
    const eventKey = new Date(event.date).toISOString().split("T")[0];
    acc[eventKey] = acc[eventKey] || [];
    acc[eventKey].push(event);
    return acc;
  }, {});

  const generateTimestamps = () => {
    return Array.from({ length: 24 }, (_, i) => `${i}:00`);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-section">
          <h1>SoccerBrite</h1>
        </div>
        <nav className="nav-links">
          <Link href="/user-homepage">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/calendar" className="active">Calendar</Link>
          <Link href="/">Log Out</Link>
        </nav>
      </aside>

      <main className="main-content">
        <div className="header">
          <h1>Calendar</h1>
        </div>
        <div className="calendar-section">
          <div className="calendar-left">
            <div className="mini-calendar">
              <h3>{currentDate.toLocaleString("default", { month: "long" })}</h3>
              <div className="mini-calendar-grid">
                {getMonthDays(currentDate).map((day, index) => (
                  <div
                    key={index}
                    className={`mini-calendar-day ${
                      day && eventsByDate[day.toISOString().split("T")[0]] ? "has-event" : ""
                    }`}
                  >
                    {day && <span>{day.getDate()}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="daily-agenda">
              <h3>Upcoming Events</h3>
              <ul>
                {events
                  .filter((event) => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <li key={event.id}>
                      <span style={{ color: event.color }}>●</span> {event.name} -{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="calendar-right">
            <div className="calendar-header">
              <button onClick={handlePrevWeek}>&lt;</button>
              <h2>
                {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
              </h2>
              <button onClick={handleNextWeek}>&gt;</button>
            </div>
            <div className="calendar-week-view">
              <div className="timestamps">
                {generateTimestamps().map((timestamp, index) => (
                  <div key={index} className="timestamp">
                    {timestamp}
                  </div>
                ))}
              </div>

              {weekDays.map((day, index) => (
                <div key={index} className="day-column">
                  <div className="day-header">
                    <div className="day-of-week">{day.toLocaleString("default", { weekday: "short" })}</div>
                    <div className="day-of-month">{day.getDate()}</div>
                  </div>
                  {generateTimestamps().map((timestamp, idx) => (
                    <div key={idx} className="hour-block">
                      {eventsByDate[day.toISOString().split("T")[0]]?.map((event) => (
                        <div
                          key={event.id}
                          className="event-block"
                          style={{ backgroundColor: event.color }}
                        >
                          {event.name}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
