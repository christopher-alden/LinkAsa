import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
    const [weatherData, setWeatherData] = <any>useState({});

    const toCelsius = (kelvin) => {
        if(Number.isFinite(kelvin)) {
            const KELVIN_CELSIUS_DIFF = 273.15;
            return Math.floor(kelvin - KELVIN_CELSIUS_DIFF);
        }
    };
    const searchWeather = async (location:string) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0cacd5d85328e1f1f84c82b63a51cd82`;
        try {
            const res = await axios.get(url);
            setWeatherData(res.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return {
        weatherData,
        searchWeather,
        toCelsius
    };
};

export default useWeather;
