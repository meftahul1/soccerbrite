"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import left from "../../../images/left_arrow.svg"
import right from "../../../images/right_arrow.svg"

const PublicEvents = () => {
    const [currentIndex, setcurrentIndex] = useState(0);
    const [cardsToShow, setcardsToShow] = useState(1);


    // @jair integrate backend and replace projectsData with the data stored in db
    const projectsData = [
        {
            title: "Soccer Tournament",
            description: "A thrilling 5v5 tournament for enthusiasts.",
            date: "2024-12-20",
            location: "Brooklyn, NY",
            remainingSpots: 8
        },
        {
            title: "Futsal Tournament",
            description: "Learn advanced soccer techniques.",
            date: "2024-12-25",
            location: "Queens, NY",
            remainingSpots: 5
        },
        {
            title: "Youth League Match",
            description: "An engaging match for young players.",
            date: "2025-01-10",
            location: "Manhattan, NY",
            remainingSpots: 12
        }
    ];

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setcardsToShow(projectsData.length);
            } else {
                setcardsToShow(1);
            }
        };

        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    const nextEvent = () => {
        setcurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    };

    const prevEvent = () => {
        setcurrentIndex((prevIndex) => prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1);
    };

    return (
        <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='Events'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Upcoming <span className='underline underline-offset-4 decoration-1 under font-light'>on Soccerbrite</span></h1>
            <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Explore Upcoming Events Near You</p>

            {/* Slider buttons */}
            <div className='flex justify-end items-center mb-8'>
                <button
                    className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Events'
                    onClick={prevEvent}
                >
                    <Image src={left} alt='prev' />
                </button>
                <button
                    className='p-3 bg-gray-200 rounded' aria-label='Next Events'
                    onClick={nextEvent}
                >
                    <Image src={right} alt='next' />
                </button>
            </div>

            {/* Project slider container */}
            <div className="overflow-hidden">
                <div className="flex gap-8 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)` }}
                >
                    {projectsData.map((project, index) => (
                        <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
                            <div className='bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col gap-4 h-full'>
                                <h2 className='text-lg font-semibold text-gray-800'>{project.title}</h2>
                                <p className='text-gray-600 text-sm'>{project.description}</p>
                                <p className='text-gray-500 text-sm'><strong>Date:</strong> {project.date}</p>
                                <p className='text-gray-500 text-sm'><strong>Location:</strong> {project.location}</p>
                                <p className='text-gray-500 text-sm'><strong>Remaining Spots:</strong> {project.remainingSpots}</p>
                                <button className='mt-auto bg-[#3498db] text-white px-4 py-2 rounded hover:bg-[#2980b9] transition-all duration-300 ease-in-out'>Join</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublicEvents;
