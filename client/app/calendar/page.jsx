// app/calendar/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import useEvents from "../hooks/useEvents"; // Import custom hook
import Link from "next/link";
import "./calendar.css";  // Assuming styles are here

const Calendar = () => {
  const { events } = useEvents(); // Get events from custom hook
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const generateDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    let dayCount = 1;

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    while (dayCount <= daysInMonth) {
      days.push(dayCount);
      dayCount++;
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const days = generateDays(currentYear, currentMonth);

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
            <button onClick={prevMonth}>&lt;</button>
            <span>{monthNames[currentMonth]} {currentYear}</span>
            <button onClick={nextMonth}>&gt;</button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-day-name">Sun</div>
            <div className="calendar-day-name">Mon</div>
            <div className="calendar-day-name">Tue</div>
            <div className="calendar-day-name">Wed</div>
            <div className="calendar-day-name">Thu</div>
            <div className="calendar-day-name">Fri</div>
            <div className="calendar-day-name">Sat</div>

            {days.map((day, index) => (
              <div key={index} className={`calendar-day ${day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "current-day" : ""}`}>
                {day}
                <div className="events-on-day">
                  {events
                    .filter((event) => event.date.includes(day))
                    .map((event) => (
                      <div key={event.id} className="event">
                        {event.name}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
