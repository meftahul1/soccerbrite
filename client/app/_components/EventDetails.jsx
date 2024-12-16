import React from "react";

const EventDetails = ({ event, status, isOpen, onClose }) => {
  if (!isOpen) return null;

  const createGoogleMapsLink = (location) => {
    if (location?.location?.coordinates) {
      const [lng, lat] = location.location.coordinates;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Close button */}
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

        {/* Modal content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 pr-8">{event.match_name}</h2>

          <div className="space-y-3 mb-6">
            <p className="text-gray-700">{event.match_description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Date</p>
                <p className="text-gray-800">
                  {new Date(event.match_date).toLocaleDateString()}
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

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            {status === "registered" && (
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                Cancel Registration
              </button>
            )}
            {status === "not-registered" && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Sign Up
              </button>
            )}
            {status === "organizer" && (
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
