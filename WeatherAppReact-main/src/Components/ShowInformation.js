import React from 'react';
import "./ShowInformation.css";

export default function ShowInformation({weather}) {

  const dayOfWeek = (millisecond = new Date().getTime()) =>{
    return new Date(millisecond).toLocaleDateString("en-EN",{weekday:"long"});
  };


  let windDirection = "";
  let deg = weather.wind.deg;
  if(deg>45 && deg <=135) windDirection = "East";
  else if(deg>135 && deg <= 225) windDirection = "South";
  else if(deg>225 && deg  <= 315) windDirection = "West";
  else windDirection = "North";

  let current_temperature = weather.main.temp>0? "+"+Math.round(weather.main.temp):Math.round(weather.main.temp)
  let speed = weather.wind.speed;

  let weatherImage = [
      {
          url: "/images/broken-clouds.png",
          ids: [803,804],
          description: "broken clouds"
      },
      {
          url: "/images/clear-sky.png",
          ids: [800],
          description: "clear sky"
      },
      {
          url: "/images/few-clouds.png",
          ids: [801],
          description: "few clouds"
      },
      {
          url: "/images/mist.png",
          ids: [701,711,721,731,741,751,761,762,771,781],
          description: "mist"
      },
      {
          url: "/images/rain.png",
          ids: [500,501,502,503,504],
          description: "rain"
      },
      {
          url: "/images/scattered-clouds.png",
          ids: [802],
          description: "scattered clouds"
      },
      {
          url: "/images/shower-rain.png",
          ids: [520,521,522,531],
          description: "shower rain"
      },
      {
          url: "/images/snow.png",
          ids: [600,601,602,611,612,613,615,616,620,621,622],
          description: "snow"
      },
      {
          url: "/images/thunderstrom.png",
          ids: [200,201,202,210,211,212,221,230,231,232],
          description: "thunderstrom"
      }
    ]

    let src = ""
    let title = ""
    let imgID = weather.weather[0].id;
    weatherImage.forEach((obj)=>{
        if(obj.ids.indexOf(imgID) !== -1){
            src = obj.url;
            title = obj.description;
        }
    })



  return (
    <section className="weather_today">

        <div className="weather_details">
            <h2 className="weather_city">{weather.name}</h2>
            <p className="weather_day">{ dayOfWeek() } </p>
            <div className="weather_current">
                <p className="weather_indicator weather_indicator--humidity">  <span className="value"> {weather.main.humidity} </span> % </p>
                <p className="weather_indicator weather_indicator--wind"> <span className="value"> {`${windDirection}, ${speed}`} </span> m/s </p>
                <p className="weather_indicator weather_indicator--pressure"> <span className="value"> {weather.main.pressure} </span> hPa </p>
            </div>
        </div>

        
        <img src={src} title="" alt={title} className="weather_image" />

       
        <div className="weather_temperature"> <span className="value">{ current_temperature }</span> &deg;C</div>
        
    </section>
  )
}
