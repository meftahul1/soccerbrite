"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import './Home.css';
import ronaldo from "../images/cover.png";
import bottom from "../images/sb.jpg";
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <h1 className="title">SOCCERBRITE</h1>
        </div>
        <div className="btn">
          <Link href="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="first">
        <div className="image-container">
          <Image src={ronaldo} className="cover-image" alt="cover" />
          <div className="overlay-text">
            <h1 className="main-text">PLAY WITH</h1>
            <h1 className="highlight-text">THE PROS</h1>
          </div>
        </div>
      </div>

      <div className="connect-section">
        <div className="connect-content">
          <div className="connect-image">
            <Image src={bottom} alt="Soccer Player" className="soccer-image" />
          </div>
          <div className="connect-text">
            <h2 className="section-title">
              <span className="highlight">WHERE PLAYERS CONNECT</span>
            </h2>
            <p className="section-description">
              Showcase your skills with friends, invite them to play, and create exciting soccer events in just a few clicks. Whether you're organizing a casual pick-up game or a competitive match, SoccerBrite makes it easy to host, manage, and share soccer events. Find players, reserve fields, and bring the game to life—anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

