import { useState, useEffect } from 'react'
import axios from "axios"
const openWeatherMapKey = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

const Details = ( {countryData: { capital, area, languages } }) => {
    return (
    <div style={{ margin: '0' }}>
        <p>Capital: {capital.join(', ')}</p>
        <p>Area: {area} km²</p>
        <h3>Languages:</h3>
        <ul>
            {Object.values(languages).map((language) => (
            <li key={language}>{language}</li>
            ))}
        </ul>
        <WeatherDetails city={capital[0]}/>
        <p>{'_'.repeat(35)}</p>
    </div>
    )
}

const WeatherDetails = ({ city }) => {
    const [weatherData, setWeatherData] = useState({})
    const [iconSrc, setIconSrc] = useState('')

    const fetchWeatherData = (city) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapKey}&units=metric`)
            .then(response => {
                setWeatherData(response.data)
                const iconId = response.data.weather[0].icon
                setIconSrc(`https://openweathermap.org/img/wn/${iconId}@2x.png`)
            })
    }

    useEffect(() => fetchWeatherData(city), [city])

    return(
        <div>
            <h3>Weather in {city}</h3>
            <img src={iconSrc} />
            <p>Temperature: {`${weatherData?.main?.temp}°c` || 'Loading'}</p>
            <p>Wind Speed: {`${weatherData?.wind?.speed} km/h` || 'Loading'}</p>
        </div>
    )
}

const Country = ( { countryData, countryData :{flag, name} }) => {
    const [detailed, setDetailed] = useState(false)
     return(
        <div>
            <div style={{ display: 'flex', alignItems: 'center', margin:'0' }}>
                <h2 style={{ margin: '10px 0' }}>{flag} {name.common}</h2>
                <button style={{ marginLeft: '10px' }}onClick={() => {setDetailed(!detailed)}}>{detailed ? 'Hide' : 'Show'} Details</button>
            </div>
            {detailed && <Details countryData={countryData}/>}
        </div>
    )
}   

export default Country