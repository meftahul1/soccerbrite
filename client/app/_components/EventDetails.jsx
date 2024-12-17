"use client";
import React, { useRef, useEffect, useState } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import useEvents from "../hooks/useEvents";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EventDetails = ({
  event,
  status,
  isOpen,
  onClose,
  mapContainerStyle = { width: "100%", height: "200px" },
}) => {
  const { signUpEvent, signOffEvent, deleteEvent } = useEvents();
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const router = useRouter();
  const [weather, setWeather] = useState(null);

  const createGoogleMapsLink = (location) => {
    if (location?.location?.coordinates) {
      const [lng, lat] = location.location.coordinates;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    return null;
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
      );
      if (!response.ok) {
        throw new Error("Weather fetch error");
      }
      const data = await response.json();
      if (data && data.daily) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleWeather = async () => {
    if (!event?.match_location?.location?.coordinates) {
      console.warn("Invalid or missing coordinates.");
      return;
    }

    const [longitude, latitude] = event.match_location.location.coordinates;
    try {
      console.log("Fetching weather data for event:", latitude, longitude);
      const data = await fetchWeather(latitude, longitude);

      console.log("Weather data:", data);

      if (data?.daily) {
        const dates = data.daily.time;
        const dateStr = new Date(event.match_date).toISOString().split("T")[0];
        const index = dates.indexOf(dateStr);
        console.log("Event date:", dateStr);

        console.log("Event date index:", index);

        if (index !== -1) {
          const forecast = {
            temperature_2m_max: data.daily.temperature_2m_max[index],
            temperature_2m_min: data.daily.temperature_2m_min[index],
            precipitation_probability_max:
              data.daily.precipitation_probability_max[index],
            wind_speed_10m_max: data.daily.wind_speed_10m_max[index],
          };
          setWeather(forecast);
        } else {
          console.warn("No forecast data found for the event date.");
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (event?.match_location) {
      handleWeather();
    }
  }, [event]);

  const handleSignUpEvent = async () => {
    try {
      await signUpEvent(event._id);
      router.push("/calendar");
    } catch (error) {
      console.error("Error signing up for event:", error);
    }
  };

  const handleSignOffEvent = async () => {
    try {
      await signOffEvent(event._id);
      router.push("/events");
    } catch (error) {
      console.error("Error signing off event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(event._id);
      router.push("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!isOpen || !event) return null;

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="text-center text-gray-600">Loading map...</div>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    console.error("Error loading maps:", loadError);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="text-center text-red-600">
            Error loading map. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  const markerPosition = event.match_location.location.coordinates
    ? {
        lat: event.match_location.location.coordinates[1],
        lng: event.match_location.location.coordinates[0],
      }
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 pr-8">{event.match_name}</h2>

          <div className="space-y-3 mb-6">
            <p className="text-gray-700">{event.match_description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Date</p>
                <p className="text-gray-800">
                  {new Date(event.match_date).toISOString().split("T")[0]}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600">Time</p>
                <p className="text-gray-800">{event.match_time}</p>
              </div>

              <div className="col-span-2">
                <p className="text-sm font-semibold text-gray-600">Location</p>
                {createGoogleMapsLink(event.match_location) ? (
                  <a
                    href={createGoogleMapsLink(event.match_location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {event.match_location.name}
                  </a>
                ) : (
                  <span>{event.match_location.name}</span>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Available Spots
                </p>
                <p className="text-gray-800">
                  {parseInt(event.max_players) -
                    parseInt(event.current_players)}{" "}
                  spots left
                </p>
              </div>
            </div>
          </div>

          {markerPosition && (
            <div className="rounded-lg overflow-hidden">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={markerPosition}
                zoom={17}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                  zoomControl: true,
                }}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </div>
          )}

          {weather && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Weather Forecast</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm">High: {weather.temperature_2m_max}°F</p>
                <p className="text-sm">Low: {weather.temperature_2m_min}°F</p>
                <p className="text-sm">
                  Rain: {weather.precipitation_probability_max}%
                </p>
                <p className="text-sm">
                  Wind: {weather.wind_speed_10m_max} mph
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            {status === "registered" && (
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                onClick={handleSignOffEvent}
              >
                Cancel Registration
              </button>
            )}
            {status === "not-registered" && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={handleSignUpEvent}
              >
                Sign Up
              </button>
            )}
            {status === "organizer" && (
              <>
                <Link
                  href={`/events/edit/${event._id}`}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Edit Match
                </Link>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={handleDeleteEvent}
                >
                  Delete Event
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
