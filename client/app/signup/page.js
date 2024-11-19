"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import '../Home.css';
import Link from 'next/link';


const Signup = () => {
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
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
  
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
  
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" required />
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
  
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className='join'>
            Already have an account?{' '}
            <Link href="/login" className='join-now'>
                Login Now
            </Link>
        </p>
      </div>
      </>
    );
  };
  
  export default Signup;