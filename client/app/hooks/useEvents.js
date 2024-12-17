"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); // Add status

  // Add pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    perPage: 3,
  });

  // Add filters state
  const [filters, setFilters] = useState({
    search_term: "",
    location: null,
    radius: 5000,
    date_from: null,
    date_to: null,
    start_time: null,
    end_time: null,
  });

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
  const resetFilters = useCallback(() => {
    setFilters({
      search_term: "",
      location: null,
      radius: 5000,
      date_from: null,
      date_to: null,
      start_time: null,
      end_time: null,
    });
  }, []);
  const getPublicEvents = useCallback(
    async ({ page = 1, newFilters = null, resetPagination = false } = {}) => {
      setLoading(true);
      try {
        // Update filters if new ones are provided
        if (newFilters) {
          setFilters((prev) => ({ ...prev, ...newFilters }));
        }

        // Reset to page 1 if filters change
        const currentPage = resetPagination ? 1 : page;

        console.log("filters", filters);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public-matches`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...filters,
              ...(newFilters || {}),
              page: currentPage,
              per_page: pagination.perPage,
              user_email: session?.user?.email,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch public events");
        }

        const data = await response.json();
        setPublicEvents(data.matches || []);
        setPagination({
          currentPage: data.pagination.current_page,
          totalPages: data.pagination.total_pages,
          totalItems: data.pagination.total_items,
          perPage: data.pagination.per_page,
        });
      } catch (error) {
        console.error("Error fetching public events:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [filters, pagination.perPage]
  );

  // Handler for changing page
  const handlePageChange = useCallback(
    (newPage) => {
      getPublicEvents({ page: newPage });
    },
    [getPublicEvents]
  );

  // Handler for updating filters
  const updateFilters = useCallback(
    (newFilters) => {
      getPublicEvents({ newFilters, resetPagination: true });
    },
    [getPublicEvents]
  );

  const signUpEvent = async (eventId) => {
    if (status !== "authenticated") {
      setError("You must be logged in to sign up for an event");
      return false;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/join-match/${eventId}`,
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
        throw new Error("Failed to sign up for event");
      }

      await getPublicEvents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOffEvent = async (eventId) => {
    if (status !== "authenticated") {
      setError("You must be logged in to sign off an event");
      return false;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leave-match/${eventId}`,
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
        throw new Error("Failed to sign off from event");
      }

      await getPublicEvents();
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
    publicEvents,
    loading,
    error,
    isSubmitting,
    createEvent,
    fetchEvents,
    getPublicEvents,
    resetFilters,
    pagination,
    filters,
    updateFilters,
    handlePageChange,
    isAuthenticated: status === "authenticated",
    signUpEvent,
    signOffEvent,
  };
};

export default useEvents;
