import React from "react";
import getDayOfWeek from "../utils/getDayOfWeek";
import * as Icons from "react-weather-icons";

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
  weatherIcons: any;
  weatherCodes: any;
  color: string;
}

const ForecastDay: React.FC<ForecastDayProps> = ({
  weatherData,
  offset,
  weatherIcons,
  weatherCodes,
  color,
}) => {
  let code: string = weatherData.daily.weather_code[offset].toString();

  const iconName: string = "Day" + weatherIcons[code];
  const IconComponent = Icons[iconName]
    ? Icons[iconName]
    : Icons["Thermometer"];

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
