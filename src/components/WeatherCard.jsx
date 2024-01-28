import React, { useRef, useState } from 'react'
import './styles/weatherCard.css'

const WeatherCard = ({weather, temp, setTextInput, hasError}) => {

    const [isCelsius, setIsCelsius] = useState(true)


    const handleChange = () => {
        setIsCelsius(!isCelsius)
    }

    const city = useRef()

    const handleForm = event => {
        event.preventDefault()
        setTextInput(city.current.value.toLowerCase().trim())
    }

  return (
    <section className='weather'>
        <h1 className='weatherTitle'>Weather App</h1>
        <form className='weatherForm'>
            <input type="text" className='weatherInput' ref={city}/>
            <button className='weatherSearch' onClick={handleForm}>Search</button>
        </form>
        {
            hasError ?
                <>                
                <h2>That city was not found</h2>
                <h3>Please, try again</h3>
                </>
                :
                <>
                <h2 className='weatherCity'>{weather?.name}, {weather?.sys.country}</h2>
                <article className='weatherContainer1'>
                <img 
                className='weatherImg'
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} 
                alt="Weather Icon" />
                <div className='weatherDiv'>
                    <h3 className='watherClouds'> " {weather?.weather[0].description} "</h3>
                    <ul className='weatherInfo'>
                        <li><span>Wind Speed: </span>
                            <b>{weather?.wind.speed}m/s</b>
                        </li>
                        <li><span>Clouds: </span>
                            <b>{weather?.clouds.all}%</b>
                        </li>
                        <li><span>Pressure: </span>
                            <b>{weather?.wind.speed}hPa</b>
                        </li>
                        <li><span>Humidity: </span>
                            <b>{weather?.main.humidity}%</b>
                        </li>
                    </ul>
                </div>
                </article>
                <div className='weatherContainer2'>
                <h3 className='weatherTemp'>
                {
                    isCelsius ?
                    temp?.celsius + ' °C'
                    :
                    temp?.fahrenheit + ' °F'
                }
                </h3>
                <button onClick={handleChange} className='weatherBtn'>
                    Change to {isCelsius?'°F' : '°C'}
                </button>
                </div>
                </>
        }
    </section>
  )
}

export default WeatherCard