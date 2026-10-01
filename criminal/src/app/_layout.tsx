import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function HomeHeaderButtons() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.push('/new_activity')}
      >
        <Ionicons name="add" size={24} color={theme.onSecondary} />
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="cog" size={24} color={theme.onSecondary} />
      </Pressable>
    </View>
  );
}

// Must live INSIDE ThemeProvider so useTheme() sees the real state
function RootNavigator() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.secondary },
        headerTintColor: theme.onSecondary,
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
        options={{
          title: 'Report a Crime',
          presentation: 'card',
          headerRight: () => (
            <Pressable onPress={() => router.push('/settings')}>
              <Ionicons name="cog" size={24} color={theme.onSecondary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: 'User Settings', presentation: 'card' }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  button: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  pressed: { opacity: 0.7 },
});