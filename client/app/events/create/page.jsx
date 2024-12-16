"use client";
import Link from "next/link";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useEvents from "../../hooks/useEvents";
import "./createEvent.css";
import MatchForm from "../../_components/MatchForm";
const mapContainerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "1rem",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};
const CreateEvent = () => {
  const { addEvent } = useEvents();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    spots: "",
    startTime: "",
    endTime: "",
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

    const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

    const event = {
      ...formData,
      startDateTime,
      endDateTime,
    };

    addEvent(event);
    router.push("/events");
  };

  return (
    <div className="create-event-layout">
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

      <div className="create-event-form-container">
        <MatchForm
          mapContainerStyle={mapContainerStyle}
          defaultCenter={defaultCenter}
        />
      </div>
    </div>
  );
};

export default CreateEvent;
