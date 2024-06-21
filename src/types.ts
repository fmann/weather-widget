export interface Location {
  name: string;
  region: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface WeatherCodes {
  [key: string]: any;
}

export interface WeatherIcon {
  [key: string]: any;
}
