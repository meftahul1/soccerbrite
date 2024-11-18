"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import '../Home.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const router = useRouter();
	
	const handleLogin = async (ev) => {
		ev.preventDefault();
		try {
			const res = await fetch('http://localhost:5000/api/login', {
				method: 'POST',
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({ email, password }),
			});
			if (res.ok) {
				router.push('/');
			}
			else {
				const data = await res.json();
				setError(data.error);
			}
		} catch (er) {
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
        <h2>Enter Credentials to Log In</h2>
    
        <form className="signup-form" onSubmit={handleLogin}>
  
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address"
		  value={email} onChange={(ev) => setEmail(ev.target.value)} required />
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"
		  value={password} onChange={(ev) => setPassword(ev.target.value)} required />
  
          <button type="submit" className="signup-btn">Log In</button>
        </form>
		{error && <p>{error}</p>}
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