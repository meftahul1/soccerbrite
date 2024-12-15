"use client";

import React from "react";
import Link from "next/link";
import useEvents from "../hooks/useEvents";
import "./events.css";

const Events = () => {
  const { events, deleteEvent } = useEvents();

  const handleSignUp = (id) => {
    console.log(`Signed up for event with ID: ${id}`);
  };

  const handleCancelRegistration = (id) => {
    deleteEvent(id);
    console.log(`Canceled registration for event with ID: ${id}`);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    console.log(`Deleted event with ID: ${id}`);
  };

  return (
    <div className="events-layout">
      <aside className="sidebar">
        <div className="logo-section">
          <h1>SoccerBrite</h1>
        </div>
        <nav className="nav-links">
          <Link href="/user-homepage">Home</Link>
          <Link href="/events" className="active">Events</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/">Log Out</Link>
        </nav>
      </aside>

      <div className="events-content">
        <div className="header">
          <h1>Soccer Events</h1>
          <Link href="/events/create" className="create-event-btn">
            Create New Event
          </Link>
        </div>

        <div className="events-container">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p> 
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Spots:</strong> {event.spots}</p>
              <div className="event-actions">
                <button
                  className="event-btn sign-up"
                  onClick={() => handleSignUp(event.id)}
                >
                  Sign Up
                </button>
                <button
                  className="event-btn cancel-registration"
                  onClick={() => handleCancelRegistration(event.id)}
                >
                  Cancel Registration
                </button>
                  <button
                    className="event-btn edit-event"
                  >
                    Edit Event
                  </button>
                <button
                  className="event-btn delete-event"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;