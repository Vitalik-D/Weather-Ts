import * as API from "../api/API";

export const loadData = async (state: object, type: string) => {
  return await API.currentWeather(state, type);
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
