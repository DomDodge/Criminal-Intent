import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { themeColor, setThemeColor } = useTheme();

  // White text unless theme is explicitly white
  const titleTextColor = themeColor.toLowerCase() === '#ffffff' ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <Text style={[styles.title, { color: titleTextColor }]}>
        Pick a Theme
      </Text>

      <Pressable style={styles.button} onPress={() => setThemeColor('#ffffff')}>
        <Text style={styles.buttonText}>White</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#1e1d1dff')}>
        <Text style={styles.buttonText}>Dark</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#7DCCAD')}>
        <Text style={styles.buttonText}>Teal</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#2C5745')}>
        <Text style={styles.buttonText}>Green</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#4D6787')}>
        <Text style={styles.buttonText}>Blue</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setThemeColor('#EB7D00')}>
        <Text style={styles.buttonText}>Orange</Text>
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