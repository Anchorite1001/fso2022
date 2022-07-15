import { useState, useEffect } from "react";

import axios from 'axios'

const CountryView = ({country}) => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_KEY;
    const capital = country.capital.toString();
    const [weatherInfo, setWeatherInfo] = useState({temperature: null, icon: null, wind: null})
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherApiKey}&units=metric`)
            .then(response =>{
                setWeatherInfo({
                    temperature: response.data.main.temp,
                    icon: response.data.weather[0].icon,
                    iconAlt: response.data.weather[0].description,
                    wind: response.data.wind.speed
                })
            })
    },[capital, weatherApiKey]) 

    return (
        <div>
            <h2>{country.name['common']}</h2>
            <p>capital {capital}</p>
            <p>area {country.area}</p>

            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key,value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <p>{country.flag}</p>

            <h3>Weather in {capital}</h3>
            <p>temperature {weatherInfo.temperature} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt={weatherInfo.iconAlt}/>
            <p>wind {weatherInfo.wind}m/s</p>
        </div>
    )
}

export default CountryView
