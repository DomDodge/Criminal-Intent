import { StyleSheet, Text } from 'react-native';
import ThemeButton from '../components/ThemeButton';
import ThemedScreen from '../components/ThemedScreen';
import { THEMES } from '../constants/themes';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, setThemeColor } = useTheme();

  return (
    <ThemedScreen style={styles.center}>
      <Text style={[styles.title, { color: theme.onPrimary }]}>Pick a Theme</Text>
      {THEMES.map((t) => (
        <ThemeButton
          key={t.name}
          theme={t}
          selected={t.name === theme.name}
          onPress={(picked) => setThemeColor(picked.primary)}
        />
      ))}
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
});