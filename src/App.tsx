import { useState, useEffect } from "react";

import LocationSidebar from "./components/LocationSidebar";
import allLocationsData from "./data/locations.json";
import { Location } from "./types";
import { ThreeDots } from "react-loading-icons";
import WeatherPanel from "./components/WeatherPanel";

function App() {
  // State variables.
  const [locations, setLocations] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);

  const allLocations = allLocationsData.data as Location[];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Load locations from local storage.
    const locations = localStorage.getItem("locations");
    if (locations) {
      setLocations(JSON.parse(locations));
    } else {
      setLocations(allLocations);
      localStorage.setItem("locations", JSON.stringify(allLocations));
    }
  }, []);

  return (
    <>
      <div className="mx-auto max-w-4xl relative">
        <div className="flex dark:text-white">
          <button
            onClick={toggleMenu}
            className="sm:hidden absolute top-2 left-2"
          >
            <svg
              className={`h-12 w-12 ${
                isMenuOpen
                  ? "transform rotate-90 transition-transform duration-200"
                  : "transform transition-transform duration-200"
              }`}
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

          <LocationSidebar
            locations={locations}
            setLocations={setLocations}
            allLocations={allLocations}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            dark={dark}
            setDark={setDark}
            editMode={editMode}
            setEditMode={setEditMode}
            setCurrentLocation={setCurrentLocation}
            setWeatherData={setWeatherData}
            setFetching={setFetching}
          />

          <div
            className={
              isMenuOpen ? "hidden sm:block grow p-4" : "sm:block grow p-4"
            }
          >
            {weatherData && currentLocation ? (
              <WeatherPanel
                weatherData={weatherData}
                currentLocation={currentLocation}
              />
            ) : (
              <div>
                {fetching ? (
                  <div className="mt-48 text-center">
                    <ThreeDots className="w-12 h-12 m-auto" />
                  </div>
                ) : (
                  <div className="mt-48 text-center">
                    <button onClick={toggleMenu}>Select a location</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
