import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import ThemedScreen from '../components/ThemedScreen';
import { Activity, useTheme } from '../context/ThemeContext';

export default function Index() {
  const { theme, activities } = useTheme();

  return (
    <ThemedScreen>
      <FlatList
        style={styles.scroll}
        contentContainerStyle={styles.criminalContainer}
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CriminalActivity activity={item} textColor={theme.onPrimary} />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.onPrimary }]}>
            No crimes reported yet. Tap + to report one.
          </Text>
        }
      />
    </ThemedScreen>
  );
}

function CriminalActivity({ 
  activity, 
  textColor 
}: { 
  activity: Activity; 
  textColor: string; 
}) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.activity, pressed && styles.pressed]}
      onPress={() =>
        router.push({ pathname: '/new_activity', params: { id: activity.id } })
      }
    >
      <Text style={[styles.medText, { color: textColor }]}>
        {activity.solved ? (
          <Ionicons name="lock-closed" size={24} color={textColor} />
        ) : (
          ''
        )}{' '}
        {activity.title}
      </Text>
      <Text style={{ color: textColor }}>{activity.details}</Text>
      <Text style={styles.dateText}>
        {new Date(activity.date).toDateString()}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    width: '100%',
  },
  criminalContainer: {
    gap: 10,
    padding: 10,
  },
  activity: {
    padding: 12,
    gap: 4,
  },
  medText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#8e8e93',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
  },
  pressed: {
    opacity: 0.7,
  },
});