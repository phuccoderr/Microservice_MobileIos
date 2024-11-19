import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/register"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/forgot-password"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(user)/product/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(user)/checkout"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(user)/thanks"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({});
