"use client";

import React, { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
