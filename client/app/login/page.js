"use client";
import React from 'react';
import '../Home.css';
import '@styles/globals.css'
import Link from 'next/link';
import GoogleButton from '../_components/GoogleButton';




const Login = () => {
    return (
    <>
      <div className="nav">
        <div className="header-nav">
            <h1>SOCCERBRITE</h1>
            <a href="/" className="back-home-btn">Back to Home</a>
        </div>
      </div>
      <div className="signup-container">

        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-4">
            SoccerBrite
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
            Enter Credentials to Sign Up
        </h2>
    
        <form className="signup-form">
  
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" required />
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
  
          <button type="submit" className="signup-btn">Log In</button>
        </form>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        <div className="google-container">
          <GoogleButton className='google-btn'/>
        </div>

        <p className='join'>
            New to SoccerBrite?{' '}
            <Link href="/signup" className='join-now'>
                Sign Up Now
            </Link>
        </p>

      </div>
      </>
    );
  };
  
  export default Login;