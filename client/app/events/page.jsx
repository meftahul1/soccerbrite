// app/events/page.jsx
"use client";

import React, { useState } from "react";
import useEvents from "../hooks/useEvents";  // Import custom hook
import Link from "next/link";
import "./events.css";  // Assuming styles are here

const Events = () => {
  const { events, addEvent } = useEvents(); // Get events and addEvent function
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.location) {
      alert("Please fill in all fields!");
      return;
    }
    const newEvent = {
      id: events.length + 1,
      ...formData,
    };
    addEvent(newEvent);
    setFormData({ name: "", date: "", location: "" });
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
              <label>Date:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Enter event date"
                required
              />
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
