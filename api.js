import axios from 'axios';
// import router from "./src/router/router"

const axiosApiInstance = axios.create();
const apiKey = import.meta.env.VITE_API_KEY_WEATHER;

axiosApiInstance.interceptors.request.use((config) => {
  let params = new URLSearchParams();
  params.append("appid", apiKey);
  config.params = params;
  return config;
})

export default axiosApiInstance;