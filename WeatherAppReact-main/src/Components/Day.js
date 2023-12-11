import React from 'react';
import './Day.css';

export default function Day({ data }) {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const dayOfWeek = (millisecond = Date.now()) => {
    return new Date(millisecond).toLocaleDateString('en-EN', { weekday: 'long' });
  };

  const temperature = data.main.temp > 0 ? '+' + Math.round(data.main.temp) : Math.round(data.main.temp);
  const dayName = dayOfWeek(data.dt * 1000);

  return (
    <article className="weather_forecast_item">
      <img src={iconUrl} alt={data.weather[0].description} title={data.weather[0].description} className="weather_forecast_icon" />
      <h3 className="weather_forecast_day">{dayName}</h3>
      <p className="weather_forecast_temperature">
        <span className="value">{temperature}</span> &deg;C
      </p>
    </article>
  );
}