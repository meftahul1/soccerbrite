"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import left from "../../images/left_arrow.svg"
import right from "../../images/right_arrow.svg"
import { projectsData } from '../assets/assets'

const Events = () => {

    const [currentIndex, setcurrentIndex] = useState(0);
    const [cardsToShow, setcardsToShow] = useState(1);

    useEffect(() => {
        const updateCardsToShow = () => {
            if(window.innerWidth >= 1024) {
                setcardsToShow(projectsData.length)
            } else {
                setcardsToShow(1)
            };
            
        };
            updateCardsToShow();

            window.addEventListener('resize', updateCardsToShow);
            return () => window.removeEventListener('resize', updateCardsToShow);
        
    }, [])

    const nextEvent = () => {
        setcurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length)
    }
    const prevEvent = () => {
        setcurrentIndex((prevIndex) => prevIndex === 0 ? projectsData.length - 1 : 
        prevIndex - 1)
    }


  return (
    <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='Events'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Events <span className='underline underline-offset-4 decoration-1 under font-light'>Hosted</span></h1>
        <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Explore Events Hosted by SoccerBrite</p>

        {/* slider buttons */}
        <div className='flex justify-end items-center mb-8'>
            <button
            className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Events'
            onClick={prevEvent}
            >
                <Image src={left} alt='prev'/>
            </button>
            <button 
            className='p-3 bg-gray-200 rounded mr-2' aria-label='Next Events'
            onClick={nextEvent}
            >
                <Image src={right} alt='next'/>
            </button>
        </div>


        {/* project slider container */}
        
        <div className="overflow-hidden">
            <div className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`}}
            >
                {projectsData.map((project, index) => (
                    <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
                        <Image src={project.image} alt="project.title" className='w-full h-auto mb-14' />
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>

                                <h2 className='text-xl font-semibold text-gray-800'>{project.title}</h2>
                                <p className='text-gray-500 text-sm'>
                                    {project.price} <span>|</span> {project.location}
                                </p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>
  )
}

export default Events