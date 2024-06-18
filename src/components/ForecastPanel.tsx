import React from "react";
import ForecastDay from "./ForecastDay";

interface ForecastPanelProps {
  weatherData: {
    daily: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
      time: string[];
    };
  };
}

const ForecastPanel: React.FC<ForecastPanelProps> = ({ weatherData }) => {
  return (
    <>
      <h3>Forecast</h3>
      <div id="widget--body--forecast-panel" className="flex">
        {weatherData.daily.temperature_2m_max.map(
          (temp: number, index: number) => (
            <ForecastDay key={index} weatherData={weatherData} offset={index} />
          )
        )}
      </div>
    </>
  );
};

export default ForecastPanel;
