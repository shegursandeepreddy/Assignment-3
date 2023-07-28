import React, { useState, useEffect } from 'react';
import '../styles/Weather.css';
import { Link } from "react-router-dom";


const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=e5eadaec2c911241c2fd3e158a5285d2');
                const responseJson = await response.json();
                setWeatherData(responseJson);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    if (isLoading || !weatherData) {
        return <div>Loading...</div>;
    }

    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    return (
        <div className="">
            <h2>{weatherData.name}</h2>
            {weatherData.main && (
                <>
                    <p>Feels Like: {weatherData.main.feels_like} &#8451;</p>
                    <p>Min Temp: {weatherData.main.temp_min} &#8451;</p>
                    <p>Max Temp: {weatherData.main.temp_max} &#8451;</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </>
            )}
            <p>Visibility: {weatherData.visibility} m</p>
            <Link to="/weather">
            <button onClick={() => console.log(weatherData)}>Know More</button>  
            </Link>
        </div>
    );
};

export default WeatherCard;
