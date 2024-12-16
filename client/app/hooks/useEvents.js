"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); // Add status

  const fetchEvents = useCallback(async () => {
    if (status !== "authenticated") return;

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
  }, [status, session?.user?.email]);

  useEffect(() => {
    if (status === "authenticated") {
      // Check status instead of session?.user?.email
      fetchEvents();
    }
  }, [fetchEvents, status]); // Update dependency

  const createEvent = async (formData) => {
    if (status !== "authenticated") {
      setError("You must be logged in to create an event");
      return false;
    }

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

      await fetchEvents();
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
    isAuthenticated: status === "authenticated",
  };
};

export default useEvents;
