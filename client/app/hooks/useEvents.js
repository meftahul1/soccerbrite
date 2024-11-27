import { useState, useEffect } from "react";

const useEvents = () => {
  const [events, setEvents] = useState(() => {
    // Only use localStorage when running on the client
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("events")) || [];
    }
    return []; // Return empty array during SSR
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, { id: Date.now(), ...newEvent }];
    setEvents(updatedEvents);
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const updateEvent = (id, updatedData) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, ...updatedData } : event
    );
    setEvents(updatedEvents);
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  return { events, addEvent, deleteEvent, updateEvent };
};

export default useEvents;
