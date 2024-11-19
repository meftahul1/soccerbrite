import { useState, useEffect } from "react";

const useEvents = () => {
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events")) || [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return { events, addEvent, deleteEvent };
};

export default useEvents;
