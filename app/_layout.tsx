import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notifications" options={{ 
        title: 'Notifications',
        presentation: 'card'
      }} />
      <Stack.Screen name="messages" options={{ 
        title: 'Messages',
        presentation: 'card'
      }} />
    </Stack>
  );
}
