import React from 'react'
import Navbar from './Navbar'


const Header = () => {
    return (
      <div
        className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden"
        style={{ backgroundImage: "url('/field-5.jpg')" }}
        id="Header"
      >
        <Navbar />

        <div className='container text-center mx-auto py-20 px-6 md:px-20 lg:px-32 text-white'> 
            <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-10'>Explore soccer events with SoccerBrite</h2>
            <div className='space-x-6 mt-16'>
            <a 
            href="#Events" 
            className='border border-white px-8 py-3 rounded transition-all duration-300 transform hover:bg-white hover:text-blue-500 hover:scale-105'
            >
            Events
            </a>
            <a 
            href="#Contact" 
            className='bg-blue-500 text-white px-8 py-3 rounded transition-all duration-300 transform hover:bg-blue-700 hover:scale-105'
            >
            Events
            </a>
                
            </div>
        </div>
      </div>
    );
  };
  

export default Header