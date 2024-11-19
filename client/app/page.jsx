"use client";
import Image from "next/image";
import React from "react";
import "./Home.css";
import ronaldo from "../images/cover.png";
import bottom from "../images/sb.jpg";
import Link from "next/link";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-header">
        <div className="home-logo">
          <h1 className="home-title">SOCCERBRITE</h1>
        </div>
        <div className="home-btn">
          <Link href="/signup">
            <button className="home-signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="home-first">
        <div className="home-image-container">
          <Image src={ronaldo} className="home-cover-image" alt="cover" />
          <div className="home-overlay-text">
            <h1 className="home-main-text">PLAY WITH</h1>
            <h1 className="home-highlight-text">THE PROS</h1>
          </div>
        </div>
      </div>

      <div className="home-connect-section">
        <div className="home-connect-content">
          <div className="home-connect-image">
            <Image
              src={bottom}
              alt="Soccer Player"
              className="home-soccer-image"
            />
          </div>
          <div className="home-connect-text">
            <h2 className="home-section-title">
              <span className="home-highlight">WHERE PLAYERS CONNECT</span>
            </h2>
            <p className="home-section-description">
              Showcase your skills with friends, invite them to play, and create
              exciting soccer events in just a few clicks. Whether you're
              organizing a casual pick-up game or a competitive match,
              SoccerBrite makes it easy to host, manage, and share soccer
              events. Find players, reserve fields, and bring the game to
              life—anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
