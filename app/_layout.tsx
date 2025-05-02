import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {COLORS} from "@/utils/constants";

export default function RootLayout() {
  return (
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen
              name="index"
              options={{
                title: 'Restaurant Coupons',
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
          <Stack.Screen
              name="[id]"
              options={{
                title: 'Coupon Details',
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                presentation: 'modal',
              }}
          />
        </Stack>
      </SafeAreaProvider>
  );
}