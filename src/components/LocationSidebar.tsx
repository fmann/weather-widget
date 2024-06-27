import React from "react";
import fetchWeatherForLocation from "../utils/fetchWeatherForLocation";
import EditModeToggle from "../components/EditModeToggle";
import DarkModeToggle from "../components/DarkModeToggle";
import { Location } from "../types";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface LocationSidebarProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  allLocations: Location[];
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
  setLocations,
  allLocations,
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
  const removeLocationHandler = (location: Location) => {
    const newLocations = locations.filter((loc) => loc.name !== location.name);
    localStorage.setItem("locations", JSON.stringify(newLocations));
    setLocations(newLocations);
  };
  const addLocationHandler = (location: Location) => {
    const newLocations = [...locations, location];
    localStorage.setItem("locations", JSON.stringify(newLocations));
    setLocations(newLocations);
  };

  return (
    <div
      className={`p-4 ${
        isMenuOpen ? "block grow" : "hidden grow"
      } sm:block mt-8`}
    >
      {allLocations.map((location) => {
        if (locations.some((loc) => loc.name === location.name) || editMode) {
          return (
            <div
              key={location.name}
              className={`flex font-impact text-6xl sm:text-2xl ${
                !editMode && "text-center"
              } ${
                locations.some((loc) => loc.name === location.name) ||
                "text-slate-500"
              } sm:text-left my-4 sm:my-0`}
            >
              {editMode &&
              locations.some((loc) => loc.name === location.name) ? (
                <button onClick={() => removeLocationHandler(location)}>
                  <IoRemoveCircleOutline className="inline pr-4 sm:h-12 sm:w-12" />
                </button>
              ) : (
                editMode && (
                  <button onClick={() => addLocationHandler(location)}>
                    <IoAddCircleOutline className="inline pr-4 sm:h-12 sm:w-12" />
                  </button>
                )
              )}

              <button
                className="text-nowrap"
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
          );
        }
        return null;
      })}
      <div className="flex space-x-2">
        <DarkModeToggle dark={dark} setDark={setDark} />
        <EditModeToggle editMode={editMode} setEditMode={setEditMode} />
      </div>
    </div>
  );
};

export default LocationSidebar;
