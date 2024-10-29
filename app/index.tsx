import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { router } from "expo-router";
import { useEffect } from "react";

const RootPage = () => {
  const { data: me, isLoading } = useGetMe();
  useEffect(() => {
    if (!isLoading) {
      if (me) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [me, isLoading]);
  return null;
};

export default RootPage;
