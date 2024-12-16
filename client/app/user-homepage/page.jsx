"use client";
import React from "react";
import "./userHome.css";
import Link from "next/link";
import SideBar from "../_components/SideBar";

const UserHome = () => {
  return (
    <div className="user-home-layout">
      <SideBar selected="home" />
      <div className="main-content">
        <h2>Welcome to Soccerbrite</h2>
        <p>Select an option from the sidebar to proceed.</p>
      </div>
    </div>
  );
};

export default UserHome;
