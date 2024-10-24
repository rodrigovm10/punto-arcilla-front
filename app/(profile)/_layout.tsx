import { Stack } from 'expo-router'

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='check-role'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='address'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
