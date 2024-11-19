"use client";
import React from "react";
import "./userHome.css";
import Link from "next/link";

const UserHome = () => {
  return (
    <div className="user-home-layout">
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/calendar">Calendar</Link>
          </li>
          <li>
            <Link href="/">Log Out</Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h2>Welcome to Soccerbrite</h2>
        <p>Select an option from the sidebar to proceed.</p>
      </div>
    </div>
  );
};

export default UserHome;
