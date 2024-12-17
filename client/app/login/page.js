"use client";
import Image from "next/image";
// SoccerBriteLanding.jsx
import React, { useState } from "react";
import "../Home.css";
import Link from "next/link";
import GoogleButton from "../_components/GoogleButton";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login error:", result.error);
      } else {
        push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
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
        <h2 className="subheader-1">Enter Credentials to Log In</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="signup-btn">
            Log In
          </button>
        </form>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        <div className="google-container">
          <GoogleButton className="google-btn" />
        </div>

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
