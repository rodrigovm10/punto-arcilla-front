import { Stack } from 'expo-router'

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{ statusBarColor: '#582F0E', headerStyle: { backgroundColor: '#582F0E' } }}
    >
      <Stack.Screen
        name='profile'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='role'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='address'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
