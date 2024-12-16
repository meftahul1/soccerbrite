// app/events/page.js
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
} from "react-icons/fa";

function EventCard({ event }) {
  const createGoogleMapsLink = (location) => {
    if (location?.location?.coordinates) {
      const [lng, lat] = location.location.coordinates;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{event.match_name}</h2>
        <p className="text-gray-600">{event.match_description}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <FaCalendarAlt className="w-4 h-4 flex-shrink-0" />
          <span>{formatDate(event.match_date)}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <FaClock className="w-4 h-4 flex-shrink-0" />
          <span>{event.match_time}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" />
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

        <div className="flex items-center gap-3 text-gray-600">
          <FaUsers className="w-4 h-4 flex-shrink-0" />
          <span>
            {event.current_players} - {event.max_players} participants
          </span>
        </div>
      </div>

      <div className="mt-4 px-4 py-2 bg-gray-100 rounded-md">
        <p className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize">{event.match_status}</span>
        </p>
      </div>
    </div>
  );
}

export default function UpcomingEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const fetchEvents = async () => {
      try {
        const date = new Date().toISOString().split("T")[0];
        console.log("Date:", date);
        console.log("User email:", session.user?.email);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user_upcoming_matches`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email: session.user?.email,
              date: date,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        console.log("Fetched events:", data);
        setEvents(data.matches || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [session, status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Upcoming Events</h1>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              You haven't joined any events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
