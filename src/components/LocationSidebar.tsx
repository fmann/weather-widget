import React from "react";

import fetchWeatherForLocation from "../utils/fetchWeatherForLocation";
import DarkModeToggle from "../components/DarkModeToggle";

interface Location {
  name: string;
  region: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

interface LocationSidebarProps {
  locations: Location[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
}

const LocationSidebar: React.FC<LocationSidebarProps> = ({
  locations,
  isMenuOpen,
  toggleMenu,
  dark,
  setDark,
  setCurrentLocation,
  setWeatherData,
}) => {
  return (
    <div
      className={`p-4 ${isMenuOpen ? "block grow" : "hidden"} sm:block mt-8`}
    >
      {locations.map((location) => (
        <div
          key={location.name}
          className="font-impact text-6xl sm:text-2xl text-center sm:text-left my-4 sm:my-0"
        >
          <button
            onClick={() => {
              fetchWeatherForLocation(
                location,
                setCurrentLocation,
                setWeatherData
              );
              toggleMenu();
            }}
          >
            {location.name}
          </button>
        </div>
      ))}
      <DarkModeToggle dark={dark} setDark={setDark} />
    </div>
  );
};

export default LocationSidebar;
