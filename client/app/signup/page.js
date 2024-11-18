"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import '../Home.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const router = useRouter();
	
	const handleSignup = async (ev) => {
		ev.preventDefault();
		try {
		    const res = await fetch('http://localhost:5000/api/signup', {
			    method: 'POST',
			    headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({ firstName, lastName, email, password }),
			});
			if (res.ok) {
				router.push('/login');
			}
			else {
				const data = await res.json();
				setError(data.error);
			}
		}
		catch (er) {
			setError('error');
		}
	};
	
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
        <h2>Enter Credentials to Sign Up</h2>
    
        <form className="signup-form" onSubmit={handleSignup}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter your first name"
		  value={firstName} onChange={(ev) => setFirstName(ev.target.value)} required />
  
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter your last name"
		  value={lastName} onChange={(ev) => setLastName(ev.target.value)} required />
  
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address"
		  value={email} onChange={(ev) => setEmail(ev.target.value)} required />
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"
		  value={password} onChange={(ev) => setPassword(ev.target.value)} required />
  
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
		{error && <p>{error}</p>}
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