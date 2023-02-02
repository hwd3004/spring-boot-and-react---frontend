import axios, { AxiosHeaders } from "axios";

const BACKEND_ROOT_ENDPOINT = "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: BACKEND_ROOT_ENDPOINT,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CustomAxiosHeaders extends AxiosHeaders {
  Authorization?: string;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const heaers = config.headers as CustomAxiosHeaders;

    if (token) {
      heaers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
