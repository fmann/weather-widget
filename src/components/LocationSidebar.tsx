import React from "react";
import fetchWeatherForLocation from "../utils/fetchWeatherForLocation";
import EditModeToggle from "../components/EditModeToggle";
import DarkModeToggle from "../components/DarkModeToggle";
import { Location } from "../types";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface LocationSidebarProps {
  locations: Location[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationSidebar: React.FC<LocationSidebarProps> = ({
  locations,
  isMenuOpen,
  toggleMenu,
  dark,
  setDark,
  editMode,
  setEditMode,
  setCurrentLocation,
  setWeatherData,
  setFetching,
}) => {
  return (
    <div
      className={`p-4 ${isMenuOpen ? "block grow" : "hidden"} sm:block mt-8`}
    >
      {locations.map((location) => (
        <div
          key={location.name}
          className={`font-impact text-6xl sm:text-2xl ${
            !editMode && "text-center"
          } sm:text-left my-4 sm:my-0`}
        >
          {editMode && <IoRemoveCircleOutline className="inline pr-4" />}
          <button
            onClick={() => {
              fetchWeatherForLocation(
                location,
                setCurrentLocation,
                setWeatherData,
                setFetching
              );
              toggleMenu();
            }}
          >
            {location.name}
          </button>
        </div>
      ))}
      <DarkModeToggle dark={dark} setDark={setDark} />
      <EditModeToggle editMode={editMode} setEditMode={setEditMode} />
    </div>
  );
};

export default LocationSidebar;
