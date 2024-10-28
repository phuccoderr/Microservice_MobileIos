import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAccessToken = async (value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("access_token", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("access_token");
  } catch (e) {
    console.log(e);
    return null;
  }
};
