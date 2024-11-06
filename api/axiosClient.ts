import { URL_CONSTANST } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const createAxiosInstance = (baseUrl: string) => {
  const axiosClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: baseUrl,
  });

  axiosClient.interceptors.request.use(async (config) => {
    const sessionToken = await AsyncStorage.getItem("access_token");

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
      throw error.response.data;
    }
  );
  return axiosClient;
};

export const customersAxiosClient = createAxiosInstance(
  URL_CONSTANST.CUSTOMERS
);
export const productsAxiosClient = createAxiosInstance(URL_CONSTANST.PRODUCTS);
export const cartsAxiosClient = createAxiosInstance(URL_CONSTANST.CART);
export const categoriesAxiosClient = createAxiosInstance(
  URL_CONSTANST.CATEGORIES
);
