"use client";

import React from "react";
import Link from "next/link";
import useEvents from "../hooks/useEvents";
import "./events.css";
import SideBar from "../_components/SideBar";

const Events = () => {
  const { events } = useEvents();

  const handleSignUp = (id) => {
    console.log(`Signed up for event with ID: ${id}`);
  };

  // const handleCancelRegistration = (id) => {
  //   deleteEvent(id);
  //   console.log(`Canceled registration for event with ID: ${id}`);
  // };

  // const handleDeleteEvent = (id) => {
  //   deleteEvent(id);
  //   console.log(`Deleted event with ID: ${id}`);
  // };

  return (
    <div className="events-layout">
      <SideBar selected="events" />

      <div className="events-content">
        <div className="header">
          <h1>Soccer Events</h1>
          <Link href="/events/create" className="create-event-btn">
            Create New Event
          </Link>
        </div>

        <div className="events-container">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h2>{event.match_name}</h2>
              <p>{event.match_description}</p>
              <p>
                <strong>Date:</strong> {event.match_date}
              </p>
              <p>
                <strong>Time:</strong> {event.match_time}
              </p>
              <p>
                <strong>Location:</strong> {event.match_location.name}
              </p>
              <p>
                <strong>Spots:</strong>{" "}
                {event.max_payers - event.current_players}
              </p>
              <div className="event-actions">
                <button
                  className="event-btn sign-up"
                  onClick={() => handleSignUp(event._id)}
                >
                  Sign Up
                </button>
                <button
                  className="event-btn cancel-registration"
                  onClick={() => handleCancelRegistration(event._id)}
                >
                  Cancel Registration
                </button>
                <button className="event-btn edit-event">Edit Event</button>
                <button
                  className="event-btn delete-event"
                  onClick={() => handleDeleteEvent(event._id)}
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
