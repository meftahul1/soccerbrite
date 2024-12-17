"use client";
import Image from "next/image";
// SoccerBriteLanding.jsx
import React, { useState } from "react";
import "../Home.css";
import Link from "next/link";
import GoogleButton from "../_components/GoogleButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { push } = useRouter();

  if (session) {
    return (
      <div className="login-container">
        <h1>You are already logged in</h1>
        <Link href="/">
          <button className="login-btn">Go to Home</button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
		  email,
          password
        }),
      });

      if (res.ok) {
        push("/login");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <div className="nav">
        <div className="header-nav">
          <h1>Soccerbrite</h1>
          <a href="/" className="back-home-btn">
            Back to Home
          </a>
        </div>
      </div>
      <div className="signup-container">
        <h1 className="header-1">Welcome to Soccerbrite</h1>
        <h2 className="subheader-1">Enter Credentials to Sign Up</h2>
    
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            required
			value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            required
			value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
			value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
			value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="signup-btn"
          >
            Sign Up
          </button>
        </form>

        <p className="join">
          Already have an account?{" "}
          <Link href="/login" className="join-now">
            Login Now
          </Link>
        </p>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

		<div className="google-container">
          <GoogleButton className="google-btn" />
        </div>
      </div>
    </>
  );
};

export default Signup;
