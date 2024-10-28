import { URL_CONSTANST } from "@/constants/api";
import { getAccessToken } from "@/utils/AsyncStorage";
import axios from "axios";

const createAxiosInstance = (baseUrl: string) => {
  const axiosClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: baseUrl,
  });

  axiosClient.interceptors.request.use((config) => {
    const sessionToken = getAccessToken();

    if (sessionToken && !config?.headers.Authorization) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      const originalRequest = error.config;
      return Promise.reject(error);
    }
  );
  return axiosClient;
};

export const customersAxiosClient = createAxiosInstance(
  URL_CONSTANST.CUSTOMERS
);
