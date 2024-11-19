"use client";
import Image from 'next/image'; 
// SoccerBriteLanding.jsx 
import React from 'react';
// import './Home.css';
import ronaldo from "../images/cover.png";
import bottom from "../images/sb.jpg";
import Link from 'next/link';
import cleats from "../images/cleats.svg"
import arena from "../images/soccer-arena.svg"
import controller from "../images/controller.svg"
import '@styles/globals.css'
import Navbar from './_components/Navbar';
import Header from './_components/Header';
import About from './_components/About';
import Events from './_components/Events';
import Footer from './_components/Footer';




// const Home = () => {
//   return (
//     <>
//       <div className="bg-black text-white flex flex-row justify-between relative z-[1]">
//         <div className="flex-1 absolute top-5 left-10 z-10">
//         <h1 className="text-white-600 text-4xl font-extrabold">SOCCERBRITE</h1>
//         </div>
//         <div className="absolute top-5 right-7 z-10">
//           <Link href="/signup">
//             <button className="bg-red-700 text-white text-base font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-900">
//               Sign Up
//             </button>
//           </Link>
//       </div>
//       </div>

//       <div className="first">
//         <div className="relative w-full">
//           <Image src={ronaldo} className="w-full" alt="cover" />
//           <div className="overlay-text absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-left">
//             <h1 className="main-text text-6xl font-bold mb-2 mt-12">PLAY WITH</h1>
//             <h1 className="highlight-text text-5xl font-bold text-red-500">THE PROS</h1>
//           </div>
//         </div>
//     </div>

//       <div className="event-card">
//         <div className="event-grid">
//           <div className="event-one">
//             <Image src={cleats} className="event-img" alt="cleats" />
//             <h3 className="event-subtitle">Invite Friends</h3>
//           </div>
//           <div className="event-two">
//             <Image src={arena} className="event-img" alt="events" />
//             <h3 className="event-subtitle">Create Events</h3>
//           </div>
//           <div className="event-three">
//             <Image src={controller} className="event-img" alt="cleats" />
//             <h3 className="event-subtitle">Game On!</h3>
//           </div>
//         </div>
//       </div>


//       <div className="connect-section">
//         <div className="connect-content">
//           <div className="connect-image">
//             <Image src={bottom} alt="Soccer Player" className="soccer-image" />
//           </div>
//           <div className="connect-text">
//             <h2 className="section-title">
//               <span className="highlight">WHERE PLAYERS CONNECT</span>
//             </h2>
//             <p className="section-description">
//               Showcase your skills with friends, invite them to play, and create exciting soccer events in just a few clicks. Whether you're organizing a casual pick-up game or a competitive match, SoccerBrite makes it easy to host, manage, and share soccer events. Find players, reserve fields, and bring the game to life—anytime, anywhere.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="footer">
        
//       </div>
//     </>
//   );
// };

const Home = () => {

  return (
  <div className="w-full overflow-hidden">
    
    <Header />
    <About />
    <Events />
    <Footer />
    </div>
    
  );
}

export default Home;

