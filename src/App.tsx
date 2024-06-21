import { useState, useEffect } from "react";

import ForecastPanel from "./components/ForecastPanel";
import LocationSidebar from "./components/LocationSidebar";

import allLocationsData from "./data/locations.json";
import { Location } from "./types";
import { ThreeDots } from "react-loading-icons";

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
    setLocations(allLocations);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-3xl relative">
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

          <div className={isMenuOpen ? "hidden sm:block grow p-4" : "grow p-4"}>
            {weatherData && currentLocation ? (
              <div>
                <h2 className="text-center text-2xl text-bold pt-12 sm:pt-8">
                  {currentLocation.name}, {currentLocation.region}
                </h2>
                <h1 className="font-impact text-8xl text-center py-8">
                  {weatherData.current.temperature_2m}
                </h1>

                {weatherData.daily && (
                  <ForecastPanel weatherData={weatherData} />
                )}
              </div>
            ) : (
              <div>
                {fetching ? (
                  <div className="mt-48 text-center">
                    <ThreeDots className="w-12 h-12 m-auto" />
                  </div>
                ) : (
                  <h2 className="mt-48 text-center">Select a location</h2>
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
