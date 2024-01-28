
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
const APIkey = 'dd4c8d2a20cf2df0d0317284b78fe3c7'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [textInput, setTextInput] = useState('')
  const [finder, setFinder] = useState()
  const [hasError, setHasError] = useState(false)

  const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
      axios.get(url)
        .then(res => {
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2)
          }
          setTemp(obj)
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(()=>{
          //setTimeout(()=>{
            setIsLoading(false)
          //}, 1500);
        })
    }
  }, [coords])

  useEffect(() => {
    if (textInput) {
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`
      axios.get(url)
      .then(res => {
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(2),
          fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2)
        }
        setTemp(obj)
        setFinder(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })
    }
  }, [textInput])
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  return (
  <div className='app'>
    {
      isLoading ?
      <img className='loading' src="../assets/loading.gif" alt="Loading" />
      :
      textInput ?
      <WeatherCard
      weather =  {finder}
      temp = {temp}
      setTextInput = {setTextInput}
      hasError = {hasError}
      />
      :
      <WeatherCard
        weather =  {weather}
        temp = {temp}
        setTextInput = {setTextInput}
        hasError = {hasError}
      />
    }
  </div>
  )
}

export default App
