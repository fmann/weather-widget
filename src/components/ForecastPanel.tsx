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
      <h3 className="text-center sm:hidden">Forecast</h3>

      <div
        id="widget--body--forecast-panel"
        className="flex flex-col sm:flex-row"
      >
        {weatherData.daily.temperature_2m_max.map(
          (_temp: number, index: number) => (
            <ForecastDay key={index} weatherData={weatherData} offset={index} />
          )
        )}
      </div>
    </>
  );
};

export default ForecastPanel;
