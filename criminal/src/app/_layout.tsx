import { Stack } from "expo-router";
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="new_activity" 
          options={{ 
            title: 'Report a Crime',
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'User Settings',
            presentation: 'card'
          }} 
        />
      </Stack>
    </ThemeProvider>
  )
}
