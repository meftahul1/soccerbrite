"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import left from "../../../images/left_arrow.svg";
import right from "../../../images/right_arrow.svg";
import useEvents from "../../hooks/useEvents";
import Link from "next/link";

const PersonalEvents = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [cardsToShow, setcardsToShow] = useState(1);
  const { events } = useEvents();

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setcardsToShow(events.length);
      } else {
        setcardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextEvent = () => {
    setcurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Events"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        My Events
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        Explore Events Hosted by SoccerBrite
      </p>

      {/* Slider buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          className="p-3 bg-gray-200 rounded mr-2"
          aria-label="Previous Events"
          onClick={prevEvent}
        >
          <Image src={left} alt="prev" />
        </button>
        <button
          className="p-3 bg-gray-200 rounded"
          aria-label="Next Events"
          onClick={nextEvent}
        >
          <Image src={right} alt="next" />
        </button>
      </div>

      {/* Project slider container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
          }}
        >
          {events.map((event, index) => (
            <div key={index} className="relative flex-shrink-0 w-full sm:w-1/4">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold text-gray-800">
                  {event.match_name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {event.match_description}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Date:</strong> {event.match_date}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Location:</strong> {event.match_location.name}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Remaining Spots:</strong>{" "}
                  {event.max_players - event.current_players}
                </p>
                <Link
                  href={"/calendar"}
                  className="mt-auto bg-[#3498db] text-white px-4 py-2 rounded hover:bg-[#2980b9] transition-all duration-300 ease-in-out"
                >
                  See Calendar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalEvents;
