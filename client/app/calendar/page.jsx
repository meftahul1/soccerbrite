"use client";

import React, { useState } from "react";
import useEvents from "../hooks/useEvents"; 
import Link from "next/link";
import "./calendar.css"; 

const Calendar = () => {
  const { events } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendarDays = (date) => {
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

  const [calendarDays, setCalendarDays] = useState(generateCalendarDays(currentDate));

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
    setCalendarDays(generateCalendarDays(prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
    setCalendarDays(generateCalendarDays(nextMonth));
  };

  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    const eventKey = eventDate.toISOString().split("T")[0];
    acc[eventKey] = acc[eventKey] || [];
    acc[eventKey].push(event);
    return acc;
  }, {});

  return (
    <div className="user-home-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/calendar">Calendar</Link></li>
          <li><Link href="/">Log Out</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={handlePrevMonth}>&lt;</button>
            <h2>
              {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            </h2>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="calendar-grid">
            <div className="calendar-day-name">Sun</div>
            <div className="calendar-day-name">Mon</div>
            <div className="calendar-day-name">Tue</div>
            <div className="calendar-day-name">Wed</div>
            <div className="calendar-day-name">Thu</div>
            <div className="calendar-day-name">Fri</div>
            <div className="calendar-day-name">Sat</div>
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${
                  day && day.toDateString() === new Date().toDateString() ? "current-day" : ""
                }`}
              >
                {day && (
                  <div>
                    <span>{day.getDate()}</span>
                    {eventsByDate[day.toISOString().split("T")[0]]?.map((event) => (
                      <div key={event.id} className="event">
                        {event.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
