"use client";

import React, { useState } from "react";
import Link from "next/link";
import useEvents from "../hooks/useEvents";
import "./events.css";

const fetchCoord = async (city) => {
  try {
    const country = "USA";
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1`);
    if (!response.ok) {
      throw new Error("Coordinate fetch error");
    }
    const data = await response.json();
    if (data.length === 0) {
      return null;
    }
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }
  catch (error) {
    console.error(error);
    return null;
  }
};

const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`);
    if (!response.ok) {
      throw new Error("Weather fetch error");
    }
    const data = await response.json();
    if (data && data.daily) {
      return data;
    }
    else {
      return null;
    }
  }
  catch (error) {
    console.error(error);
    return null;
  }
};

const Events = () => {
  const { events } = useEvents();
  const [weather, setWeather] = useState({});

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

  const handleWeather = async (location, eventDate, eventId) => {
    const city = location.trim();
    const coord = await fetchCoord(city);
    if (coord) {
      const data = await fetchWeather(coord.lat, coord.lon);
      if (data && data.daily) {
        const dates = data.daily.time;
        const dateStr = new Date(eventDate).toISOString().split('T')[0];
        const index = dates.indexOf(dateStr);
        if (index !== -1) {
          const forecast = {
            temperature_2m_max: data.daily.temperature_2m_max[index],
            temperature_2m_min: data.daily.temperature_2m_min[index],
            precipitation_probability_max: data.daily.precipitation_probability_max[index],
            wind_speed_10m_max: data.daily.wind_speed_10m_max[index],
          };
          setWeather((state) => ({...state, [eventId]: forecast,}));
        }
      }
    }
  };

  return (
    <div className="events-layout">
      <aside className="sidebar">
        <div className="logo-section">
          <h1>SoccerBrite</h1>
        </div>
        <nav className="nav-links">
          <Link href="/user-homepage">Home</Link>
          <Link href="/events" className="active">
            Events
          </Link>
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
                <button
                  className="event-btn weather"
                  onClick={() => handleWeather(event.location, event.date, event.id)}
                >
                  Weather
                </button>
              </div>
              {weather[event.id] && (
                <div>
                  <p>Max: {weather[event.id].temperature_2m_max}°F</p>
                  <p>Min: {weather[event.id].temperature_2m_min}°F</p>
                  <p>Precipitation: {weather[event.id].precipitation_probability_max}%</p>
                  <p>Wind: {weather[event.id].wind_speed_10m_max} mph</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
