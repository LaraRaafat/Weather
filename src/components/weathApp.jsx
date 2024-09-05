import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import imgg from "../assets/images/W.jpg"; 
import './weathApp.css';

const WeathApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('London');
  const [inputValue, setInputValue] = useState(''); 
  const apiKey = '827f1657ae3846bca5070404240109';
  const apiUrl = `https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${location}&key=${apiKey}&format=json`;

  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setWeatherData(response.data.data.current_condition[0]);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [location]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setLocation(inputValue); 
    }
  };

  return (
    <div className='container'>
      <div className="weatherapp">
        <div className="search">
          <div className="searchTop">
            <i className="fas fa-map-marker-alt"></i>
            <div className="location">{location}</div>
          </div>
          <div className="search-bar">
            <input
              type='text'
              placeholder='Enter Your Location'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={handleKeyDown} 
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="imgweather">
          <img src={imgg} alt="weather" />
          <div className="weather-type">
            {weatherData ? weatherData.weatherDesc[0].value : 'Loading...'}
          </div>
          <div className="temp">
            {weatherData ? `${weatherData.temp_C}°C` : 'Loading...'}
          </div>
        </div>
        <div className="weatherdate">
          <p>{weatherData ? weatherData.localObsDateTime : 'Loading...'}</p>
        </div>
        <button onClick={() => navigate('/barchart')}>View Bar Chart</button> 
      </div>
    </div>
  );
};

export default WeathApp;
