import { useState, useEffect } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

interface Location {
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

function App() {
  // State variables.
  const [dark, setDark] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  // Dark mode handler.
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  // Fetch weather data for a location.
  const fetchWeatherForLocation = (location: Location) => {
    setCurrentLocation(location);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.coord.lat}&longitude=${location.coord.lon}` +
        `&current=temperature_2m,wind_speed_10m` +
        `&forecast_hours=24` +
        `&hourly=temperature_2m,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  };

  useEffect(() => {
    setLocations([
      {
        name: "Vancouver",
        country: "Canada",
        coord: {
          lat: 49.2827,
          lon: 123.1207,
        },
      },
      {
        name: "Victoria",
        country: "Canada",
        coord: {
          lat: 48.4284,
          lon: 123.3656,
        },
      },
      {
        name: "Warsaw",
        country: "Poland",
        coord: {
          lat: 52.22977,
          lon: 21.01178,
        },
      },
    ]);
  }, []);

  return (
    <>
      <div id="widget--wrapper" className="mx-auto max-w-3xl">
        <div id="widget--header" className="bg-white dark:bg-black">
          <div>
            <button onClick={() => darkModeHandler()}>
              {dark && <IoSunny />}
              {!dark && <IoMoon />}
            </button>
          </div>
        </div>
        <div id="widget--body" className="flex dark:text-white">
          <div
            id="widget--body--nav-menu"
            className="bg-slate-200 dark:bg-slate-800 p-4"
          >
            {locations.map((location) => (
              <div key={location.name} className="font-impact text-2xl">
                <button onClick={() => fetchWeatherForLocation(location)}>
                  {location.name}
                </button>
              </div>
            ))}
          </div>
          <div
            id="widget--body--content-area"
            className="grow bg-orange-200 dark:bg-orange-900 p-4"
          >
            {weatherData && currentLocation ? (
              <div>
                <h2>
                  {currentLocation.name}, {currentLocation.country}
                </h2>
                <h1 className="font-impact text-4xl">
                  {weatherData.current.temperature_2m}
                </h1>
                <div id="widget--body--forecast-panel">
                  {weatherData.hourly.temperature_2m.map(
                    (temp: number, index: number) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-black p-2 m-2"
                      >
                        <h3>{temp}</h3>
                        <p>{weatherData.hourly.time[index]}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h1>Weather</h1>
                <h2>Select a location to view weather data.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
