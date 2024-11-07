import React, { useState, useEffect } from 'react';
import './Weather.css';

const WeatherApp = () => {
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = '37551e8b7a69208fe4dd1903ee6d21e3';

  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const url = query.latitude
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${query.latitude}&lon=${query.longitude}&appid=${apiKey}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
        setError('Failed to fetch weather data');
      }
    } catch (error) {
      setWeatherData(null);
      setError('Error while fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeatherData({ latitude, longitude });
        },
        () => setError('Error getting location')
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearch = () => {
    if (place) {
      fetchWeatherData(place);
    }
  };

  return (
    <div className="weather-app-container">
      <h1>Weather App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter place name"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={handleSearch}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {location && (
        <div className="weather-details">
          <h2>Weather in {place || 'Your Location'}</h2>

          {weatherData && (
            <>
              <p>Temperature: {Math.ceil(weatherData.main.temp - 273.15)}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
