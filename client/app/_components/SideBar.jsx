"use client";
import React from "react";
import Link from "next/link";

const SideBar = ({ selected }) => {
  return (
    <aside className="w-52 h-auto bg-slate-800 text-gray-100 flex flex-col items-start p-5 shadow-md gap-4">
      <div className="logo-section">
        <h1 className="text-xl font-bold">SoccerBrite</h1>
      </div>

      <nav className="w-full flex flex-col gap-2.5">
        <Link
          href="/user-homepage"
          className={`block w-full px-4 py-2.5 rounded-md transition-colors duration-300 hover:bg-blue-500 ${
            selected === "home" ? "bg-blue-500" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/events"
          className={`block w-full px-4 py-2.5 rounded-md transition-colors duration-300 hover:bg-blue-500 ${
            selected === "events" ? "bg-blue-500" : ""
          }`}
        >
          Events
        </Link>

        <Link
          href="/calendar"
          className={`block w-full px-4 py-2.5 rounded-md transition-colors duration-300 hover:bg-blue-500 ${
            selected === "calendar" ? "bg-blue-500" : ""
          }`}
        >
          Calendar
        </Link>

        <Link
          href="/"
          className="block w-full px-4 py-2.5 rounded-md transition-colors duration-300 hover:bg-blue-500"
        >
          Log Out
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
