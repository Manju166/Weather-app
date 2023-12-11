import React, { useEffect, useState } from 'react';
import "./Search.css";
import axios from 'axios';
import { geocodingBasedEndpoint } from '../utils/api';



export default function Search({onCityChange}) {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchInput.length <= 2) {
      return;
    }

    const endPoint = geocodingBasedEndpoint + searchInput;
    axios.get(endPoint)
      .then(response => setSuggestions(response.data))
  }, [searchInput]);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    onCityChange(searchInput);
  };

  
 

  return (
    <section className="search">
      <input
        type="search"
        list="suggestion"
        className="weather_search"
        placeholder="Enter city name"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSubmit(event);
          }
        }}
      />
      <datalist id="suggestion">
        {suggestions.map((suggestion) => (
          <option key={suggestion.name} value={suggestion.name} />
        ))}
      </datalist>
    </section>
  );
}
