"use client";

import React, { useState } from "react";
import useEvents from "../hooks/useEvents";  
import Link from "next/link";
import "./events.css"; 

const Events = () => {
  const { events, addEvent, deleteEvent } = useEvents();
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const [formData, setFormData] = useState({
    name: "",
    month: new Date().getMonth(),
    date: new Date().getDate(),
    year: new Date().getFullYear(),
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const { name, month, date, year, location } = formData;

    if (!name || !month || !date || !year || !location) {
      alert("Please fill in all fields!");
      return;
    }

    const eventDate = new Date(year, month, date);

    const newEvent = {
      id: events.length + 1,
      name,
      date: eventDate.toISOString().split("T")[0],
      location,
    };

    addEvent(newEvent);
    setFormData({
      name: "",
      month: new Date().getMonth(),
      date: new Date().getDate(),
      year: new Date().getFullYear(),
      location: "",
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id); 
  };

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
        <h1>Events Page</h1>
        <div className="events-list">
          <h2>Upcoming Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong> - {event.date} at {event.location}
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="events-form">
          <h2>Add New Event</h2>
          <form onSubmit={handleAddEvent}>
            <div>
              <label>Event Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter event name"
                required
              />
            </div>
            <div>
              <label>Month:</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                required
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Date:</label>
              <input
                type="number"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min="1"
                max="31"
                placeholder="Enter date"
                required
              />
            </div>
            <div>
              <label>Year:</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
                required
              />
            </div>
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Events;
