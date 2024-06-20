// Fetch weather data for a location.
export default function fetchWeatherForLocation(
  location: Location,
  setLocation: Function,
  setWeatherData: Function
) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.coord.lat}&longitude=${location.coord.lon}` +
      `&current=temperature_2m,weather_code` +
      `&forecast_hours=24` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setLocation(location);
      setWeatherData(data);
    });
}
