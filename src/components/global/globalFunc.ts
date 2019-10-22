import * as API from "../api/API";

export const loadData = async (state: object) => {
  return await API.currentWeather(state);
};

export const loadDataForecast = async (state: object) => {
  return await API.currentForecast(state);
};

export const kInC = (temp: number) => {
  const actual: number = temp - 273.15;
  return actual.toFixed(2);
};

export const changeHour = (hour: number) => {
  const actualDate: any = new Date(hour * 1000);
  const actualHour: number = actualDate.getHours();
  const actualMinutes: number = actualDate.getMinutes();
  return actualHour + ":" + actualMinutes;
};
