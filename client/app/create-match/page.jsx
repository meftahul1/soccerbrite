// app/create-match/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaInfoCircle,
} from "react-icons/fa";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "1rem",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const CreateMatch = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [formData, setFormData] = useState({
    match_name: "",
    match_description: "",
    match_date: "",
    match_time: "",
    match_location: {
      name: "",
      address: "",
      lat: defaultCenter.lat,
      lng: defaultCenter.lng,
    },
    max_participants: "",
    match_public: true,
  });

  useEffect(() => {
    if (isLoaded && !loadError) {
      initializeAutocomplete();
    }
  }, [isLoaded, loadError]);

  const initializeAutocomplete = () => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ["establishment", "address"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      updateLocation(
        place.geometry.location.lat(),
        place.geometry.location.lng(),
        place.name || "",
        place.formatted_address || ""
      );
    });
  };

  const updateLocation = async (lat, lng, name = "", address = "") => {
    setMarkerPosition({ lat, lng });

    // If name and address aren't provided, reverse geocode to get them
    if (!name || !address) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.results[0]) {
          name =
            name ||
            data.results[0].name ||
            data.results[0].formatted_address.split(",")[0];
          address = address || data.results[0].formatted_address;
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }

    setFormData((prev) => ({
      ...prev,
      match_location: {
        name,
        address,
        lat,
        lng,
      },
    }));

    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
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
    setIsSubmitting(true);
    setError("");
    console.log(formData);
    console.log(session?.user?.email);

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

      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Create Soccer Match</h1>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Time *
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
                value={formData.match_location.address}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    match_location: {
                      ...prev.match_location,
                      address: e.target.value,
                    },
                  }));
                }}
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
              name="max_participants"
              value={formData.max_participants}
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
              {isSubmitting ? "Creating..." : "Create Match"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMatch;
