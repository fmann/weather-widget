import React from "react";

interface ForecastDayProps {
  offset: number;
  weatherData: {
    daily: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      time: string[];
    };
  };
}

const ForecastDay: React.FC<ForecastDayProps> = ({ weatherData, offset }) => {
  return (
    <div
      key={weatherData.daily.time[offset]}
      className="bg-white dark:bg-black p-2 m-2 grow"
    >
      <p className="text-sm text-center">
        {formatDate(weatherData.daily.time[offset])}
      </p>
      <h3 className="text-center font-impact text-xl">
        {weatherData.daily.temperature_2m_max[offset]}
      </h3>
      <h3 className="text-center font-impact text-xl text-sky-400">
        {weatherData.daily.temperature_2m_min[offset]}
      </h3>
    </div>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
}

export default ForecastDay;
