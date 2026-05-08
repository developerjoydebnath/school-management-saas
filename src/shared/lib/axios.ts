import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
    const locale = match ? match[2] : 'en';
    
    // Add Accept-Language header
    config.headers['Accept-Language'] = locale;
  }
  return config;
});

export default axios;
