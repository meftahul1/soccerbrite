"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useEvents from "../hooks/useEvents";
import Link from "next/link";
import "./calendar.css";
import EventDetails from "../_components/EventDetails";

const Calendar = () => {
  const { events } = useEvents();
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [highlightedDay, setHighlightedDay] = useState(new Date());

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized.toISOString().split("T")[0];
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const [weekDays, setWeekDays] = useState([]);

  const handlePrevWeek = () => {
    const prevWeek = new Date(weekDays[0]);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeekDays(getWeekDays(prevWeek));
    setCurrentDate(prevWeek); // Add this line to update currentDate
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekDays[6]);
    nextWeek.setDate(nextWeek.getDate() + 1);
    setWeekDays(getWeekDays(nextWeek));
    setCurrentDate(nextWeek); // Add this line to update currentDate
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

  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toISOString().split("T")[0];
  };

  const eventsByDate = events.reduce((acc, event) => {
    const eventKey = normalizeDate(addOneDay(event.match_date));
    acc[eventKey] = acc[eventKey] || [];
    acc[eventKey].push(event);
    return acc;
  }, {});

  const generateTimestamps = () => {
    return Array.from({ length: 24 }, (_, i) => {
      const period = i >= 12 ? "PM" : "AM";
      const hour = i % 12 || 12;
      return `${hour}:00 ${period}`;
    });
  };

  const timeToIndex = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour + (minute >= 30 ? 0.5 : 0);
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    setWeekDays(getWeekDays(currentDate));
  }, [currentDate]);

  const handleDayClick = (day) => {
    setHighlightedDay(day);
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
          <Link href="/calendar" className="active">
            Calendar
          </Link>
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
              <h3>
                {currentDate.toLocaleString("default", { month: "long" })}
              </h3>
              <div className="mini-calendar-grid">
                {getMonthDays(currentDate).map((day, index) => {
                  const uniqueKey = day ? day.toISOString() : `empty-${index}`;
                  const isCurrentDay =
                    day &&
                    day.getDate() === currentDate.getDate() &&
                    day.getMonth() === currentDate.getMonth() &&
                    day.getFullYear() === currentDate.getFullYear();

                  const isHighlightedDay =
                    day &&
                    day.getDate() === highlightedDay.getDate() &&
                    day.getMonth() === highlightedDay.getMonth() &&
                    day.getFullYear() === highlightedDay.getFullYear();

                  return (
                    <div
                      key={uniqueKey}
                      className={`mini-calendar-day ${
                        isHighlightedDay ? "highlighted-day" : ""
                      } ${
                        day && eventsByDate[normalizeDate(day)]
                          ? "has-event"
                          : ""
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day && <span>{day.getDate()}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="daily-agenda">
              <h3>Upcoming Events</h3>
              <ul>
                {events
                  .filter(
                    (event) =>
                      new Date(addOneDay(event.match_date)) >= new Date()
                  )
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <li
                      key={event._id}
                      onClick={() => handleOpenModal(event)}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                    >
                      <span style={{ color: event.color }}>●</span>{" "}
                      {event.match_name} -{" "}
                      {new Date(
                        addOneDay(event.match_date)
                      ).toLocaleDateString()}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="calendar-right">
            <div className="calendar-header">
              <button onClick={handlePrevWeek}>&lt;</button>
              <h2>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </h2>
              <button onClick={handleNextWeek}>&gt;</button>
            </div>
            <div className="calendar-week-view">
              <div className="timestamps">
                {generateTimestamps().map((timestamp, index) => (
                  <div key={`timestamp-${timestamp}`} className="timestamp">
                    {timestamp}
                  </div>
                ))}
              </div>

              {weekDays.map((day, index) => (
                <div key={day.toISOString()} className="day-column">
                  <div className="day-header">
                    <div className="day-of-week">
                      {day.toLocaleString("default", { weekday: "short" })}
                    </div>
                    <div className="day-of-month">{day.getDate()}</div>
                  </div>
                  {generateTimestamps().map((timestamp, idx) => (
                    <div key={`timestamp-${timestamp}`} className="hour-block">
                      {eventsByDate[normalizeDate(day)]?.map((event) => {
                        const eventStartIndex = timeToIndex(event.match_time);
                        const eventEndIndex = timeToIndex(event.match_endTime);

                        if (idx >= eventStartIndex && idx < eventEndIndex) {
                          return (
                            <div
                              key={event._id}
                              className="event-block"
                              style={{ backgroundColor: event.color }}
                              onClick={() => handleOpenModal(event)}
                            >
                              {event.match_name}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          status={
            selectedEvent.organizer === session?.user?.email
              ? "organizer"
              : "registered"
          }
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Calendar;
