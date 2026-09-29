import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';

// Buttons that used to live in the index page's custom top bar
function HomeHeaderButtons() {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.push('/new_activity')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="cog" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 24 },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Criminal Intent',
            headerRight: () => <HomeHeaderButtons />,
          }}
        />
        <Stack.Screen
          name="new_activity"
          options={{ title: 'Report a Crime', presentation: 'card' }}
        />
        <Stack.Screen
          name="settings"
          options={{ title: 'User Settings', presentation: 'card' }}
        />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});