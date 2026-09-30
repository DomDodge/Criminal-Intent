import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Activity, useTheme } from '../context/ThemeContext';

export default function Index() {
  const { themeColor, activities } = useTheme();

  // Determine text color based on background
  const textColor = themeColor.toLowerCase() === '#ffffff' ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.criminalContainer}
      >
        {activities.length === 0 ? (
          <Text style={[styles.emptyText, { color: textColor }]}>
            No crimes reported yet. Tap + to report one.
          </Text>
        ) : (
          activities.map((activity) => (
            <CriminalActivity 
              key={activity.id} 
              activity={activity} 
              textColor={textColor} 
            />
          ))
        )}
      </ScrollView>
    </View>
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