import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/notifications" options={{ 
        title: 'Notifications',
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }} />
      <Stack.Screen name="(modals)/messages" options={{ 
        title: 'Messages',
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }} />
    </Stack>
  );
}
