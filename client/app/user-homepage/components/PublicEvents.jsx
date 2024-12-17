import React, { useEffect, useState } from "react";
import Image from "next/image";
import left from "../../../images/left_arrow.svg";
import right from "../../../images/right_arrow.svg";
import useEvents from "../../hooks/useEvents";
import Link from "next/link";

const PublicEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setcardsToShow] = useState(1);
  const { getAllPublicEvents } = useEvents();
  const [publicEvents, setPublicEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPublicEvents = async () => {
      setIsLoading(true);
      try {
        const events = await getAllPublicEvents();
        setPublicEvents(events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPublicEvents();
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setcardsToShow(3);
      } else if (window.innerWidth >= 1024) {
        setcardsToShow(2);
      } else if (window.innerWidth >= 768) {
        setcardsToShow(2);
      } else {
        setcardsToShow(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const nextEvent = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, publicEvents.length - cardsToShow);
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  const prevEvent = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  if (isLoading) {
    return (
      <div className="py-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498db]"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-4 mb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
          Upcoming{" "}
          <span className="underline underline-offset-4 decoration-1 under font-light">
            on Soccerbrite
          </span>
        </h1>
        <p className="text-center text-gray-500 mb-8 max-w-md mx-auto">
          Explore Upcoming Events Near You
        </p>

        <div className="flex justify-end items-center mb-8">
          <button
            className="p-3 bg-gray-200 rounded mr-2 hover:bg-gray-300 transition-colors"
            aria-label="Previous Events"
            onClick={prevEvent}
          >
            <Image src={left} alt="prev" />
          </button>
          <button
            className="p-3 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            aria-label="Next Events"
            onClick={nextEvent}
          >
            <Image src={right} alt="next" />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
            }}
          >
            {publicEvents.map((event, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
              >
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
                    <strong>Location:</strong> {event.match_location?.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Remaining Spots:</strong>{" "}
                    {event.max_players - event.current_players}
                  </p>
                  <Link
                    href="/events"
                    className="mt-auto bg-[#3498db] text-white px-4 py-2 rounded hover:bg-[#2980b9] transition-all duration-300 ease-in-out text-center"
                  >
                    Join
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicEvents;
