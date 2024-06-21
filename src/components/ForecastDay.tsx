import React from "react";
import getDayOfWeek from "../utils/getDayOfWeek";
import weatherCodesData from "../data/weatherCodes.json";
import weatherIconData from "../data/weatherIcons.json";
import * as Icons from "react-weather-icons";
import { WeatherCodes, WeatherIcon } from "../types";
interface ForecastDayProps {
  offset: number;
  weatherData: {
    daily: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
      time: string[];
    };
  };
}

const ForecastDay: React.FC<ForecastDayProps> = ({ weatherData, offset }) => {
  let code: string = weatherData.daily.weather_code[offset].toString();
  let color: string = document.body.classList.contains("dark")
    ? "white"
    : "black";

  const weatherCodes = weatherCodesData as WeatherCodes;
  const weatherIcons = weatherIconData as WeatherIcon;
  const iconName: string = "Day" + weatherIcons[code];
  const IconComponent = Icons[iconName];

  return (
    <div
      key={weatherData.daily.time[offset]}
      className="p-2 m-2 flex flex-col items-center"
    >
      <div className="text-2xl sm:text-lg">
        {getDayOfWeek(weatherData.daily.time[offset])}
      </div>
      <div className="sm:py-4">
        <IconComponent color={color} size={72} />
      </div>
      <h3 className="font-impact text-4xl sm:text-xl">
        {weatherData.daily.temperature_2m_max[offset]}
      </h3>
      <h3 className=" font-impact text-4xl sm:text-xl text-sky-400">
        {weatherData.daily.temperature_2m_min[offset]}
      </h3>
      <div className="text-center text-2xl sm:text-sm">
        {weatherCodes[code].day.description}
      </div>
    </div>
  );
};

export default ForecastDay;
