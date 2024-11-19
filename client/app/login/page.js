"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import '../Home.css';
import Link from 'next/link';
import GoogleButton from '../_components/GoogleButton';


const Login = () => {
  const { data: session, status } = useSession();
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
  return (
    <>
      <div className="nav">
        <div className="header-nav">
          <h1>SOCCERBRITE</h1>
          <a href="/" className="back-home-btn">
            Back to Home
          </a>
        </div>
      </div>
      <div className="signup-container">
        <h1>Welcome to SoccerBrite</h1>
        <h2>Enter Credentials to Log In</h2>
    
        <form className="signup-form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
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
          <GoogleButton className='google-btn'/>
        </div>

        <p className="join">
          New to SoccerBrite?{" "}
          <Link href="/signup" className="join-now">
            Sign Up Now
          </Link>
        </p>

        <div className="google-container">
          <GoogleButton className='google-btn'/>
        </div>

      </div>
    </>
  );
};

export default Login;
