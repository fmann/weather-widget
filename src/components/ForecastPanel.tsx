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
  weatherIcons: any;
  weatherCodes: any;
  color: string;
}

const ForecastPanel: React.FC<ForecastPanelProps> = ({
  weatherData,
  weatherIcons,
  weatherCodes,
  color,
}) => {
  return (
    <>
      <h3 className="text-center sm:hidden mt-16">Forecast</h3>

      <div className="flex flex-col sm:flex-row">
        {weatherData.daily.temperature_2m_max.map(
          (_temp: number, index: number) => (
            <ForecastDay
              key={index}
              weatherData={weatherData}
              weatherIcons={weatherIcons}
              weatherCodes={weatherCodes}
              color={color}
              offset={index}
            />
          )
        )}
      </div>
    </>
  );
};

export default ForecastPanel;
