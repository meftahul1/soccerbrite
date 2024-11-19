"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useEvents from "../../hooks/useEvents";
import "./createEvent.css";

const CreateEvent = () => {
  const { addEvent } = useEvents(); 
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    spots: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    router.push("/events"); 
  };

  return (
    <div className="create-event-layout">
      <h1>Create a New Event</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="spots">Available Spots:</label>
          <input
            type="number"
            id="spots"
            name="spots"
            value={formData.spots}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
