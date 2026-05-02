import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

export default axios;
