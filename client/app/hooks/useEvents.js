"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/matches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: session?.user?.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data.matches || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchEvents();
    }
  }, [fetchEvents, session]);

  const createEvent = async (formData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-match`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            organizer_email: session?.user?.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create match");
      }

      await fetchEvents(); // Refresh the events list
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    events,
    loading,
    error,
    isSubmitting,
    createEvent,
    fetchEvents,
  };
};

export default useEvents;
