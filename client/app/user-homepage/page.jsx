"use client";
import React from "react";
import "./userHome.css";
import Link from "next/link";

const UserHome = () => {
  return (
    <div className="user-home-layout">
      <aside className="sidebar">
        <div className="logo-section">
          <h1>SoccerBrite</h1>
        </div>
        <nav className="nav-links">
          <Link href="/user-homepage" className="active">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/">Log Out</Link>
        </nav>
      </aside>
      <div className="main-content">
        <h2>Welcome to Soccerbrite</h2>
        <p>Select an option from the sidebar to proceed.</p>
      </div>
    </div>
  );
};

export default UserHome;