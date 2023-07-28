import React from 'react';

const WeatherCard = (props) => {
    const { data } = props;

    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    return (
        <div className="weather-card">
            <h2>{data.name}</h2>
            {data.main && (
                <>
                    <p>Feels Like: {data.main.feels_like} &#8451;</p>
                    <p>Min Temp: {data.main.temp_min} &#8451;</p>
                    <p>Max Temp: {data.main.temp_max} &#8451;</p>
                    <p>Pressure: {data.main.pressure} hPa</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Sunset: {sunsetTime}</p>
                </>
            )}
            <p>Visibility: {data.visibility} m</p>
        </div>
    );
};

export default WeatherCard;
