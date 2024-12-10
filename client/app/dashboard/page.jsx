"use client";
import React, { useState } from "react";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const fetchCoord = async (city, country) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error("Coordinate fetch error");
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("Coordinate not found");
        return null;
      }
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } catch (error) {
      setError("Coordinate fetch error");
      console.error(error);
      return null;
    }
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
      setWeather(data.daily);
    } catch (error) {
      setError("Weather fetch error");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!city || !country) {
      setError("Enter both city and country");
      setLoading(false);
      return;
    }

    const coord = await fetchCoord(city, country);
    if (coord && coord.lat && coord.lon) {
      await fetchWeather(coord.lat, coord.lon);
    } else {
      setError("Coordinate not found");
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCity}
          placeholder="city"
        />
        <input
          type="text"
          value={country}
          onChange={handleCountry}
          placeholder="country"
        />
        <button type="submit">
          Forecast
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Max</th>
                <th>Min</th>
                <th>Precipitation</th>
                <th>Wind</th>
              </tr>
            </thead>
            <tbody>
              {weather.time.map((time, index) => (
                <tr key={index}>
                  <td>{new Date(time).toLocaleDateString("en-US", { weekday: "short" })}</td>
                  <td>{weather.temperature_2m_max[index]}°F</td>
                  <td>{weather.temperature_2m_min[index]}°F</td>
                  <td>{weather.precipitation_probability_max[index]}%</td>
                  <td>{weather.wind_speed_10m_max[index]} mph</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

