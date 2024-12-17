import React from 'react'
import Image from 'next/image'
import cleats from "../../images/cleats.svg"

const Footer = () => {
  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden' id='Footer'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
            <div className='w-full md:w-1/3 mb-8 md:mb-0'>

                <Image src={cleats} alt='logo'/>
                <p className='text-gray-400 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio iusto atque molestiae, modi veniam quis sed vel sunt totam, sapiente similique, nihil iste eum quae nobis doloremque et asperiores necessitatibus.</p>


            </div>
            <div className='w-full md:w-1/5 mb-8 md:mb-0'>
                <h3 className='text-white text-lg font-bold mb-4'>SoccerBrite</h3>
                <ul className='flex flex-col gap-2 text-gray-400'>
                    <a href="#Header" className='hover:text-white'>Home</a>
                    <a href="#About" className='hover:text-white'>About Us</a>
                    <a href="#Events" className='hover:text-white'>Events</a>
                    <a href="#Header" className='hover:text-white'>Privacy Policy</a>
                </ul>
            </div>
            <div className='w-full md:w-1/3'>

            <h3 className='text-white text-lg font-bold mb-4'>Subscribe to Newsletter</h3>
            <p className="text-gray-400 mb-4 max-w-80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quos unde cumque iste deleniti possimus quam enim, iure dolore quod, fugit eligendi consequatur pariatur eaque, odio perspiciatis? Explicabo, dolore alias!
            </p>

            <div className='flex gap-2'>
                <input 
                type="email" 
                placeholder='Enter your Email' 
                className='p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus: outline-none' />

                <button className='py-2 px-4 rounded bg-blue-500 text-white'>Subscribe</button>

            </div>

            </div>
        </div>
        <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-500'>
            Copyright 2024 &copy; SoccerBrite. All Rights Reserved
        </div>
    </div>
  )
}

export default Footer