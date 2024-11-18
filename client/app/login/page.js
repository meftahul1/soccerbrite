"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import '../Home.css';
import Link from 'next/link';


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
        <h1>Welcome to SoccerBrite</h1>
        <h2>Enter Credentials to Log In</h2>
    
        <form className="signup-form">
  
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" required />
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
  
          <button type="submit" className="signup-btn">Log In</button>
        </form>

        <p className='join'>
            New to SoccerBrite?{' '}
            <Link href="/login" className='join-now'>
                Sign Up Now
            </Link>
        </p>
      </div>
      </>
    );
  };
  
  export default Login;