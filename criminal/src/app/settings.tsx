import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function NewActivity() {
  const { themeColor, setThemeColor } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <Text style={[styles.title, { color: themeColor === '#000000' ? '#ffffff' : '#000000' }]}>
        Pick a Theme
      </Text>

      <Pressable style={styles.button} onPress={() => setThemeColor('#ffffff')}>
        <Text style={styles.buttonText}>White</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#000000')}>
        <Text style={styles.buttonText}>Black</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#007AFF')}>
        <Text style={styles.buttonText}>Blue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});