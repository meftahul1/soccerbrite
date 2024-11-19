"use client"; // This ensures the component is client-side

import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link from next/link
import React, { useState } from "react";
import "../Home.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: Add authentication logic here

    // On successful login, navigate to the user homepage
    router.push("/user-homepage");
  };

  return (
    <>
      <div className="nav">
        <div className="header-nav">
          <h1>SOCCERBRITE</h1>
          <Link href="/" className="back-home-btn">Back to Home</Link>
        </div>
      </div>
      <div className="signup-container">
        <h1>Welcome to SoccerBrite</h1>
        <h2>Enter Credentials to Log In</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">Log In</button>
        </form>

        <p className="join">
          New to SoccerBrite?{" "}
          <Link href="/signup" className="join-now">
            Sign Up Now
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
