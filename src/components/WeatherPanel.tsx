import React from "react";
import { Location } from "../types";
import ForecastPanel from "./ForecastPanel";
import weatherCodesData from "../data/weatherCodes.json";
import weatherIconData from "../data/weatherIcons.json";
import * as Icons from "react-weather-icons";
import { WeatherCodes, WeatherIcon } from "../types";

interface WeatherPanelProps {
  weatherData: any;
  currentLocation: Location;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({
  weatherData,
  currentLocation,
}) => {
  const weatherCodes = weatherCodesData as WeatherCodes;
  const weatherIcons = weatherIconData as WeatherIcon;
  const code: string = weatherData.current.weather_code.toString();
  const color: string = document.body.classList.contains("dark")
    ? "white"
    : "black";
  const iconName: string = "Day" + weatherIcons[code];
  const IconComponent = Icons[iconName]
    ? Icons[iconName]
    : Icons["Thermometer"];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-bold pt-12 sm:pt-8">
        {currentLocation.name}, {currentLocation.region}
      </h2>
      <div className="sm:py-4 text-center px-auto pt-12">
        <IconComponent color={color} size={144} />
      </div>
      <h1 className="font-impact text-8xl py-0">
        {weatherData.current.temperature_2m}
      </h1>
      <h2 className="text-2xl text-bold pt-12 sm:pt-8">
        {weatherCodes[code].day.description}
      </h2>

      {weatherData.daily && (
        <ForecastPanel
          weatherData={weatherData}
          weatherIcons={weatherIcons}
          weatherCodes={weatherCodes}
          color={color}
        />
      )}
    </div>
  );
};

export default WeatherPanel;
