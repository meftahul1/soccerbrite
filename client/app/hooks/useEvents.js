import { useState, useEffect } from "react";

const useEvents = () => {
  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedEvents = localStorage.getItem("events");
        return storedEvents ? JSON.parse(storedEvents) : [];
      } catch (error) {
        console.error("Error parsing events from localStorage:", error);
        return [];
      }
    }
    return []; 
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("events", JSON.stringify(events));
      } catch (error) {
        console.error("Error saving events to localStorage:", error);
      }
    }
  }, [events]);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, { id: Date.now(), ...newEvent }];
    setEvents(updatedEvents);
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const updateEvent = (id, updatedData) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, ...updatedData } : event
    );
    setEvents(updatedEvents);
  };

  const clearEvents = () => {
    setEvents([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("events");
    }
  };

  return { events, addEvent, deleteEvent, updateEvent, clearEvents };
};

export default useEvents;
