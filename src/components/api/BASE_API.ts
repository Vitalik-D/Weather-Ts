const BASE_API_URL = "https://api.openweathermap.org/data/2.5/";

export const get = async (url = {}) => {
  return await fetch(BASE_API_URL + url)
    .then(response => response.json())
    .catch(response => console.log(response));
};
