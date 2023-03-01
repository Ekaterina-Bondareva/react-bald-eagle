import React, { useEffect, useState } from "react";
import { ReactComponent as SearchIconWhite } from '../icons/search-white.svg';
import styles from './owfont-regular.css';
import style from './Weather.module.css';


const Weather = () => {
    const [weather, setWeather] = useState({});

    const [isError, setIsError] = useState(false);

    const [city, setCity] = useState('Apex');

    const [inputValue, setInputValue] = useState('Apex');

    const handleCityChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCity(inputValue);
        }
    };

    const fireWeatherSearch = () => {
        setCity(inputValue);
    };

    //Fetch Weather Data from https://openweathermap.org/
    useEffect(() => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=11970f0b6a5f7d829ce101d4cf0350ef&units=imperial`;

        fetch(weatherUrl, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then(result => {
            setWeather({
                "icon": result.weather[0].id, 
                "description": result.weather[0].description, 
                "temp": result.main.temp,
                "wind": result.wind.speed,
                "humidity": result.main.humidity
            })
            setIsError(false);
        })
        .catch(() => setIsError(true));
    }, [city]);

    return (
        <>
            <div className={style.Weather}>
                <span className={style.CitySearchContainer}>
                    <input 
                        type="text" 
                        placeholder="Enter your city" 
                        defaultValue={city} 
                        className={style.City} 
                        onChange={handleCityChange} 
                        onKeyDown={handleKeyDown}
                    >
                    </input>
                    <button 
                        type="button" 
                        onClick={fireWeatherSearch}
                        className={style.SearchBtn}
                    >
                        <SearchIconWhite  className={style.SearchIconWhite}/>
                    </button>
                </span>
                <i className={`owf owf-${weather.icon} owf-3x`}></i>
                <div className={style.WeatherError}>{isError && <p>Something went wrong ...</p>}</div>
                <i className={`${styles.weather}-icon ${styles.owf} ${styles.owf-`${weather.icon}`}`}></i>
                <div className={style.DescriptionContainer}>
                    <span className={style.Temperature}>{`${Math.floor(weather.temp)}°F `}</span>
                    <span className={style.WeatherDescription}>{weather.description}</span>
                </div>
                <div className={style.Wind}>{`Wind speed: ${Math.floor(weather.wind)} m/h`}</div>
                <div className={style.Humidity}>{`Humidity: ${weather.humidity}%`}</div>
            </div>
        </>
    );
};


export default Weather;