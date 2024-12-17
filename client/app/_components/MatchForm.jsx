"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaInfoCircle,
} from "react-icons/fa";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import useEvents from "../hooks/useEvents";

const MatchForm = ({ matchId = null, mapContainerStyle, defaultCenter }) => {
  const router = useRouter();
  const { createEvent, editEvent, error, isSubmitting, getEvent } = useEvents();
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [libraries] = useState(["places"]);

  const [formData, setFormData] = useState({
    match_name: "",
    match_description: "",
    match_date: "",
    match_time: "",
    match_endTime: "",
    match_location: {
      name: "",
      address: "",
      lat: defaultCenter.lat,
      lng: defaultCenter.lng,
    },
    max_players: "",
    match_public: true,
  });
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  // Fetch event data if matchId is provided
  useEffect(() => {
    const fetchEventData = async () => {
      if (matchId && !hasLoadedInitialData) {
        try {
          const eventData = await getEvent(matchId);
          if (eventData) {
            // Format date string to YYYY-MM-DD for input[type="date"]
            const formattedDate = new Date(eventData.match_date)
              .toISOString()
              .split("T")[0];

            const formattedData = {
              ...eventData,
              match_date: formattedDate,
              match_location: {
                name: eventData.match_location?.name || "",
                address: eventData.match_location?.address || "",
                lat:
                  eventData.match_location?.location?.coordinates[1] ||
                  defaultCenter.lat,
                lng:
                  eventData.match_location?.location?.coordinates[0] ||
                  defaultCenter.lng,
              },
            };

            setFormData(formattedData);
            setMarkerPosition({
              lat: formattedData.match_location.lat,
              lng: formattedData.match_location.lng,
            });
            setSearchInput(formattedData.match_location.address);
            setHasLoadedInitialData(true);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (!matchId) {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [matchId, getEvent, defaultCenter, hasLoadedInitialData]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    let autocomplete;
    if (isLoaded && !loadError && autocompleteRef.current) {
      autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          types: ["establishment", "geocode"],
          fields: ["formatted_address", "geometry", "name"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("No geometry for this place");
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.name || "";
        const address = place.formatted_address || "";

        // Update marker position and form data
        setMarkerPosition({ lat, lng });
        setFormData((prev) => ({
          ...prev,
          match_location: {
            name,
            address,
            lat,
            lng,
          },
        }));
        setSearchInput(address);

        // Pan map to new location
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(15);
        }
      });
    }

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [isLoaded, loadError]);
  // Validate that end time is after start time
  const validateTimes = (start, end) => {
    if (!start || !end) return true;
    return start < end;
  };

  const updateLocation = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results[0]) {
        const address = data.results[0].formatted_address;
        const name = data.results[0].formatted_address.split(",")[0];

        setMarkerPosition({ lat, lng });
        setFormData((prev) => ({
          ...prev,
          match_location: {
            name,
            address,
            lat,
            lng,
          },
        }));
        setSearchInput(address);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    updateLocation(lat, lng);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success;
    if (matchId) {
      success = await editEvent(matchId, formData);
    } else {
      success = await createEvent(formData);
    }

    if (success) {
      router.push("/events");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">
          {matchId ? "Edit Soccer Match" : "Create Soccer Match"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2">Match Name *</label>
            <input
              type="text"
              name="match_name"
              value={formData.match_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Sunday Friendly Match"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description *</label>
            <textarea
              name="match_description"
              value={formData.match_description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Describe the match, skill level, requirements, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2" />
                Date *
              </label>
              <input
                type="date"
                name="match_date"
                value={formData.match_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <FaClock className="inline mr-2" />
                Start Time *
              </label>
              <input
                type="time"
                name="match_time"
                value={formData.match_time}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <FaClock className="inline mr-2" />
                End Time *
              </label>
              <input
                type="time"
                name="match_endTime"
                value={formData.match_endTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Location *
            </label>
            <div className="space-y-2">
              <input
                ref={autocompleteRef}
                type="text"
                placeholder="Search for a location or click on the map"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <div className="flex items-center text-sm text-gray-600">
                <FaInfoCircle className="mr-2" />
                <span>
                  You can either search for a location or click directly on the
                  map
                </span>
              </div>

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={markerPosition}
                zoom={13}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
                onClick={handleMapClick}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                <Marker
                  position={markerPosition}
                  draggable={true}
                  onDragEnd={(e) => {
                    updateLocation(e.latLng.lat(), e.latLng.lng());
                  }}
                />
              </GoogleMap>

              {formData.match_location.address && (
                <div className="text-sm text-gray-600">
                  Selected location: {formData.match_location.address}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <FaUsers className="inline mr-2" />
              Maximum Participants *
            </label>
            <input
              type="number"
              name="max_players"
              value={formData.max_players}
              onChange={handleInputChange}
              required
              min="2"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 10"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="match_public"
                checked={formData.match_public}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    match_public: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <span className="text-gray-700">Make this match public</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting
                ? matchId
                  ? "Updating..."
                  : "Creating..."
                : matchId
                ? "Update Match"
                : "Create Match"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatchForm;
