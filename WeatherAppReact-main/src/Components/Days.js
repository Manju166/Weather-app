import React, { useState } from 'react'
import Day from './Day'
import "./Days.css"


export default function Days({ forcast }) {
  const [forcastData, setForcastData] = useState(forcast);

  return (
    <section className='weather_forecast'>
      {forcastData.map((data, id) => (
        <Day key={id} data={data} />
      ))}
    </section>
  );
}