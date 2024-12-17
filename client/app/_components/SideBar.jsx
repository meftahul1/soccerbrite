"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const SideBar = ({ selected }) => {
  const handleSignOut = async (e) => {
    e.preventDefault();
    const result = await signOut({ callbackUrl: "/" });
  };
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
        <button
          className="block w-full px-4 py-2.5 rounded-md transition-colors duration-300 hover:bg-blue-500"
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
