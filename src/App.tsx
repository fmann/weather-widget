import { useState, useEffect } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import ForecastPanel from "./components/ForecastPanel";

import allLocationsData from "./data/locations.json";
const allLocations = allLocationsData.data as Location[];

interface Location {
  name: string;
  region: string;
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch weather data for a location.
  const fetchWeatherForLocation = (location: Location) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.coord.lat}&longitude=${location.coord.lon}` +
        `&current=temperature_2m,weather_code` +
        `&forecast_hours=24` +
        //        `&hourly=temperature_2m,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentLocation(location);
        setWeatherData(data);
      });
  };

  useEffect(() => {
    setLocations(allLocations);
  }, []);

  return (
    <>
      <div id="widget--wrapper" className="mx-auto max-w-3xl relative">
        <div id="widget--body" className="flex dark:text-white">
          <button
            onClick={toggleMenu}
            className="sm:hidden absolute top-2 left-2"
          >
            <svg
              className={`h-6 w-6 ${isMenuOpen ? "transform rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            id="widget--body--nav-menu"
            className={`p-4 ${isMenuOpen ? "block" : "hidden"} sm:block mt-8`}
          >
            {locations.map((location) => (
              <div key={location.name} className="font-impact text-2xl">
                <button onClick={() => fetchWeatherForLocation(location)}>
                  {location.name}
                </button>
              </div>
            ))}
            <DarkModeToggle dark={dark} setDark={setDark} />
          </div>
          <div id="widget--body--content-area" className="grow p-4">
            {weatherData && currentLocation ? (
              <div>
                <h2 className="text-center text-2xl text-bold">
                  {currentLocation.name}, {currentLocation.region},{" "}
                  {currentLocation.country}
                </h2>
                <h1 className="font-impact text-8xl text-center">
                  {weatherData.current.temperature_2m}
                </h1>

                {weatherData.daily && (
                  <ForecastPanel weatherData={weatherData} />
                )}
              </div>
            ) : (
              <div>
                <h2 className="mt-8 text-center">Select a location</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
