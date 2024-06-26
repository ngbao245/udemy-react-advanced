import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
