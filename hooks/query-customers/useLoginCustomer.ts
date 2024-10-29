import { customersApi } from "@/api/customersApi";
import { Login } from "@/types/auth.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useLoginCustomer = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: Login) => {
      return (await customersApi.login(body)).data;
    },
    onSuccess: (data) => {
      const setToken = async () => {
        try {
          await AsyncStorage.setItem("access_token", data.access_token);
        } catch (error) {
          console.error("Failed to set token:", error);
        }
      };
      setToken();

      router.replace("/(tabs)/");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
