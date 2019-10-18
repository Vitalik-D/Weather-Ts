import { get } from "./BASE_API";

const key: string = "&appid=0d4f1a1310b951add6f65e6076f63cbc";
const forecast: string = "forecast";
const weather: string = "weather";

export const currentWeather = async (state: any) => {
  let urlPar;
  if (state.position !== undefined) {
    urlPar = `${weather}?lat=${state.position.latitude}&lon=${state.position.longitude}${key}`;
  } else {
    urlPar = `${weather}?q=${state.search}${key}`;
  }
  let getReq = await get(urlPar);
  return getReq;
};

export const currentForecast = async (state: any) => {
  let urlPar;
  if (state.position !== undefined) {
    urlPar = `${forecast}?lat=${state.position.latitude}&lon=${state.position.longitude}${key}`;
  } else {
    urlPar = `${forecast}?q=${state.search}${key}`;
  }
  let getReq = await get(urlPar);
  return getReq;
};
