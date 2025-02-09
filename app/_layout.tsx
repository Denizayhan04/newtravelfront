import { Stack } from 'expo-router';
import Colors from '../constants/Colors';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/notifications" options={{ 
        title: 'Notifications',
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          color: Colors.text,
          fontWeight: '600',
          fontSize: 16,
        },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
      }} />
      <Stack.Screen name="(modals)/messages" options={{ 
        title: 'Messages',
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          color: Colors.text,
          fontWeight: '600',
          fontSize: 16,
        },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
      }} />
    </Stack>
  );
}
