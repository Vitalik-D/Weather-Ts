import { get } from "./BASE_API";

const key: string = "&appid=0d4f1a1310b951add6f65e6076f63cbc";

export const currentWeather = async (state: any, type: string) => {
  let urlPar;
  if(type === 'weather'){
    if (state.position !== undefined) {
      urlPar = `${type}?lat=${state.position.latitude}&lon=${state.position.longitude}${key}`;
    } else {
      urlPar = `${type}?q=${state.search}${key}`;
    }
  } else if (type === 'forecast'){
    if (state.position !== undefined) {
      urlPar = `${type}?lat=${state.position.latitude}&lon=${state.position.longitude}${key}`;
    } else {
      urlPar = `${type}?q=${state.search}${key}`;
    }
  }
  let getReq = await get(urlPar);
  return getReq;
};

