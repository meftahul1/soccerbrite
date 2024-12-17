"use client";
import React from "react";
import "./userHome.css";
import Link from "next/link";
import EventsHeader from "./components/EventsHeader";
import PublicEvents from "./components/PublicEvents";
import PersonalEvents from "./components/PersonalEvents";
import Personal from "./components/PersonalEvents";


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
        <div className="heading">
        <h1 className="header-1">Welcome to Soccerbrite, Name</h1>
        <p className="subheading">Select an option from the sidebar to proceed.</p>
      </div>
        

        <EventsHeader />
        
        <PublicEvents />
        <Personal />

    
      </div>
    </div>
  );
};

export default UserHome;