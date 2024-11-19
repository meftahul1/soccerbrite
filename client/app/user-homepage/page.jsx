"use client";
import React from "react";
import "./userHome.css";
import Link from "next/link";

const UserHome = () => {
  return (
    <div className="user-home-container">
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
      
      </div>
    </div>
  );
};

export default UserHome;
