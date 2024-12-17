const FilterModal = ({
  isModalOpen,
  useCurrentLocation,
  onClose,
  filters,
  setFilters,
  handleApplyFilters,
  onLocationChange,
  clearFilters,
}) => (
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${
      isModalOpen ? "" : "hidden"
    }`}
  >
    <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter Events</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Location</span>
            <div className="flex items-center gap-2">
              <input
                id="location"
                type="checkbox"
                checked={useCurrentLocation}
                onChange={(e) => onLocationChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                className="text-blue-600 cursor-pointer"
                htmlFor="location"
              >
                Use Current Location
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Radius (km): {filters.radius}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.radius}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  radius: parseInt(e.target.value),
                }))
              }
              className="w-full"
              disabled={!useCurrentLocation}
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Date Range</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-sm text-gray-600">From</span>
              <input
                type="date"
                value={filters.date_from || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    date_from: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <span className="block text-sm text-gray-600">To</span>
              <input
                type="date"
                value={filters.date_to || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, date_to: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Time Range</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-sm text-gray-600">From</span>
              <input
                type="time"
                value={filters.start_time || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    start_time: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <span className="block text-sm text-gray-600">To</span>
              <input
                type="time"
                value={filters.end_time || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, end_time: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
);

export default FilterModal;
