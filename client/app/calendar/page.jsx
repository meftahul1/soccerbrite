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
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start from Sunday
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
    <div className="calendar-layout">
  {/* Sidebar */}
  <div className="sidebar">
    <h2 className="sidebar-title">Dashboard</h2>
    <ul className="sidebar-menu">
      <li><Link href="/events">Events</Link></li>
      <li><Link href="/calendar">Calendar</Link></li>
      <li><Link href="/">Log Out</Link></li>
    </ul>
  </div>

  {/* Main Content */}
  <div className="calendar-content">
    <div className="calendar-main-layout">
      {/* Mini Calendar and Upcoming Events (left side) */}
      <div className="mini-calendar-and-events">
        {/* Mini Calendar */}
        <div className="mini-calendar">
          <h3>{currentDate.toLocaleString("default", { month: "long" })}</h3>
          <div className="mini-calendar-grid">
            {getMonthDays(currentDate).map((day, index) => (
              <div
                key={index}
                className={`mini-calendar-day ${day && eventsByDate[day.toISOString().split("T")[0]] ? "has-event" : ""}`}
              >
                {day && <span>{day.getDate()}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
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

      {/* Weekly Calendar (right side) */}
      <div className="big-calendar">
        <div className="calendar-header">
          <button onClick={handlePrevWeek}>&lt;</button>
          <h2>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </h2>
          <button onClick={handleNextWeek}>&gt;</button>
        </div>
        <div className="calendar-week-view">
          {/* Timestamps Column */}
          <div className="timestamps">
            {generateTimestamps().map((timestamp, index) => (
              <div key={index} className="timestamp">
                {timestamp}
              </div>
            ))}
          </div>

          {/* Days Column */}
          {weekDays.map((day, index) => (
            <div key={index} className="day-column">
              <div className="day-header">
                <div className="day-of-week">{day.toLocaleString("default", { weekday: "short" })}</div>
                <div className="day-of-month">{day.getDate()}</div>
              </div>
              {generateTimestamps().map((timestamp, idx) => (
                <div key={idx} className="hour-block">
                  {eventsByDate[day.toISOString().split("T")[0]]?.map((event) => (
                    <div key={event.id} className="event-block" style={{ backgroundColor: event.color }}>
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
  </div>
</div>

  );
};

export default Calendar;
