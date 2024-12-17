"use client";
import React, { useState, useEffect } from "react";
import "./userHome.css";
import Link from "next/link";
import EventsHeader from "./components/EventsHeader";
import PublicEvents from "./components/PublicEvents";
import PersonalEvents from "./components/PersonalEvents";
import Personal from "./components/PersonalEvents";

import SideBar from "../_components/SideBar";
import { useSession } from "next-auth/react";

const UserHome = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");

  useEffect(() => {
    if (session.user.name) {
      setName(session.user.name);
    } else {
      setName(session.user.email.split("@")[0]);
    }
  }, []);
  return (
    <div className="user-home-layout">
      <SideBar selected="home" />
      <div className="main-content">
        <div className="heading">
          <h1 className="header-1">Welcome to Soccerbrite, {name}</h1>
          <p className="subheading">
            Select an option from the sidebar to proceed.
          </p>
        </div>

        <EventsHeader />

        <PublicEvents />
        <Personal />
      </div>
    </div>
  );
};

export default UserHome;
