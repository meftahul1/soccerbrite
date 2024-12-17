"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useEvents from "../hooks/useEvents";
import SideBar from "../_components/SideBar";
import FilterModal from "../_components/FilterModal";

const Events = () => {
  const {
    publicEvents,
    loading,
    error,
    getPublicEvents,
    handlePageChange,
    updateFilters,
    pagination,
    resetFilters,
  } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [filters, setFilters] = useState({
    radius: 5, // in km
    location: null,
    date_from: null,
    date_to: null,
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    getPublicEvents();
  }, [getPublicEvents]);

  const handleSearch = () => {
    updateFilters({ search_term: searchTerm });
  };

  // Handle location checkbox change
  const handleLocationChange = (checked) => {
    setUseCurrentLocation(checked);
    if (checked) {
      // Get location when checkbox is checked
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFilters((prev) => ({
              ...prev,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }));
          },
          (error) => {
            console.error("Error getting location:", error);
            // Reset checkbox if location fetch fails
            setUseCurrentLocation(false);
          }
        );
      } else {
        // Reset checkbox if geolocation is not supported
        setUseCurrentLocation(false);
        alert("Geolocation is not supported by your browser");
      }
    } else {
      // Clear location when checkbox is unchecked
      setFilters((prev) => ({
        ...prev,
        location: null,
      }));
    }
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    const filterPayload = {
      ...filters,
      radius: useCurrentLocation ? filters.radius * 1000 : undefined, // Only include radius if using location
    };
    updateFilters(filterPayload);
    setIsModalOpen(false);
  };

  // Clear filters function
  const clearFilters = () => {
    // Reset local state
    setFilters({
      radius: 5,
      location: null,
      date_from: null,
      date_to: null,
      start_time: "",
      end_time: "",
    });
    setSearchTerm("");
    setUseCurrentLocation(false);

    // Reset filters in the hook and fetch new data
    resetFilters();
    // Call API with empty filters
    updateFilters({});
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar selected="events" />
      <FilterModal
        isModalOpen={isModalOpen}
        useCurrentLocation={useCurrentLocation}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        handleApplyFilters={handleApplyFilters}
        onLocationChange={handleLocationChange}
        clearFilters={clearFilters}
      />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Soccer Events</h1>
          <Link
            href="/events/create"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Create New Event
          </Link>
        </div>

        {/* Search and Filter Button */}
        <div className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search Events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Filters
            </button>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8 text-gray-600">
            Loading events...
          </div>
        )}

        {error && (
          <div className="p-4 mb-8 text-center text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {publicEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {event.match_name}
                </h2>
                <p className="text-gray-600 mb-4">{event.match_description}</p>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(event.match_date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {event.match_time}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {event.match_location.name}
                  </p>
                  <p>
                    <span className="font-semibold">Spots Available:</span>{" "}
                    {event.max_players - event.current_players}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSignUp(event._id)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {publicEvents.length > 0 && (
          <div className="flex justify-center items-center gap-4">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className={`px-4 py-2 rounded-lg ${
                pagination.currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } transition-colors`}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className={`px-4 py-2 rounded-lg ${
                pagination.currentPage === pagination.totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } transition-colors`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
