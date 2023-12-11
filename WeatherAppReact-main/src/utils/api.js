export const currentLocationEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
export const forecastBasedEndpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
export const geocodingBasedEndpoint = `http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}&q=`;
export const openingCurrentEndpoint = `http://api.openweathermap.org/geo/1.0/reverse?&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
