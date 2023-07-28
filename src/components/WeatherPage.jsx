import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import '../styles/Weather.css';

const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setIsLoading(true);
            try {
                const data = await Promise.all(cities.map(async city => {
                    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e5eadaec2c911241c2fd3e158a5285d2`);
                    const responseJson = await response.json();
                    return responseJson;
                }));
                setWeatherData(data);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to fetch weather data');
                console.error('Failed to fetch weather data:', error);
                setIsLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;  // You could replace this with a loading spinner or skeleton screen.
    }

    return (
        <div className="weather-page">
            {weatherData.map((data, index) => <WeatherCard  className = "weather-card" key={index} data={data} />)}
        </div>
    );
};

export default WeatherPage;
