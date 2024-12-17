"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
import './Home.css';
import Navbar from './_components/Navbar';
import Header from './_components/Header';
import About from './_components/About';
import Events from './_components/Events';
import Footer from './_components/Footer';


const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Events />
      <Footer />
    </>
  );
}

export default Home;
