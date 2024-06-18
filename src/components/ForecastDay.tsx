import React from "react";
import getDayOfWeek from "../utils/getDayOfWeek";
import weatherCodesData from "../data/weatherCodes.json";
import weatherIconData from "../data/weatherIcons.json";
import * as Icons from "react-weather-icons";

const weatherCodes = weatherCodesData as WeatherCodes;
const weatherIcons = weatherIconData as WeatherIcon;

interface WeatherCodes {
  [key: string]: any;
}

interface WeatherIcon {
  [key: string]: any;
}

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

  const iconName: string = weatherIcons[code];
  const IconComponent = Icons[iconName];

  return (
    <div
      key={weatherData.daily.time[offset]}
      className="bg-white dark:bg-black p-2 m-2 flex flex-col"
    >
      <p className="text-sm text-center">
        {offset === 0
          ? "Tomorrow"
          : getDayOfWeek(weatherData.daily.time[offset])}
      </p>
      <div className="text-center">
        <IconComponent color={color} size={72} />
      </div>
      <h3 className="text-center font-impact text-xl">
        {weatherData.daily.temperature_2m_max[offset]}
      </h3>
      <h3 className="text-center font-impact text-xl text-sky-400">
        {weatherData.daily.temperature_2m_min[offset]}
      </h3>
      <div className="text-center text-sm">
        {weatherCodes[code].day.description}
      </div>
    </div>
  );
};

export default ForecastDay;
