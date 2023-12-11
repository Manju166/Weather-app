import { useEffect, useState } from 'react';
import './App.css';
import Days from './Components/Days';
import Search from './Components/Search';
import ShowInformation from './Components/ShowInformation';
import { currentLocationEndpoint, forecastBasedEndpoint } from "./utils/api"
import Swal from 'sweetalert2';


const App = () => {
  const [weather,setWeather] = useState(null);
  const [forcast,setForcast] = useState([]);
  const [city,setCity] = useState("Kathmandu");

  const getWeatherByCityName = async city => {
    const endPoint = `${currentLocationEndpoint}&q=${city}`;
    const response = await fetch(endPoint);
    const weatherData = await response.json();
    return weatherData;
  };


  // it return 5 day data as array 
  const getForecastByCityID = async id => {
    const endPoint = `${forecastBasedEndpoint}&id=${id}`;
    const result = await fetch(endPoint);
    const forecast = await result.json();
    const forecastList = forecast.list;
    const daily = [];
    forecastList.forEach(day => {
      let date_txt = day.dt_txt;
      date_txt = date_txt.replace(" ", "T");
      let date = new Date(date_txt);
      let hours = date.getHours();
      if (hours === 9) {
        daily.push(day);
      }
    });
    return daily;
  };


  const weatherForCity = async city => {
    if (weather.cod === "404") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You typed wrong city name"
      });
      return;
    }
    const cityID = weather.id;
    const forecastData = await getForecastByCityID(cityID);
    return forecastData;
  };

  const handleCityChange = async city => {
    const weatherData = await getWeatherByCityName(city);
    setWeather(weatherData);
    const forecastData = await weatherForCity(city);
    setForcast(forecastData);
  };


  useEffect(() => {
    async function fetchData() {
      let weatherData = await getWeatherByCityName("Kathmandu");
      setWeather(weatherData);
    }
    fetchData();
  }, []); 
  
  useEffect(() => {
    const option = {
      enableHighFrequency: true,
      timeout: 5000,
      maximumAge: 10000,
    };

    const success = async (position) => {
      const coords = position.coords;
      const lat = coords.latitude.toString();
      const lon = coords.longitude.toString();
      const endPoint = `${currentLocationEndpoint}&lat=${lat}&lon=${lon}`;
      const response = await fetch(endPoint);
      const result = await response.json();
      const currentCity = result[0].name;
      setCity(currentCity);
    };

    const error = (err) => {
      console.log(err.code, err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, option);
  }, []);


  return (
    <div className="weather">
      <Search onCityChange={handleCityChange} />
      <ShowInformation weather={weather} />
      <Days forcast={forcast} />
    </div>
  );
}

export default App;
