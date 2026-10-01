import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppTheme } from '../constants/themes';

type Props = {
  theme: AppTheme;
  selected?: boolean;
  onPress: (theme: AppTheme) => void;
};

export default function ThemeButton({ theme, selected = false, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(theme)}
      style={({ pressed }) => [
        styles.button,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      {/* Swatches preview the primary + secondary colors */}
      <View style={styles.swatches}>
        <View style={[styles.swatch, { backgroundColor: theme.primary }]} />
        <View style={[styles.swatch, { backgroundColor: theme.secondary }]} />
      </View>
      <Text style={styles.label}>{theme.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    minWidth: 160,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: { borderColor: '#000' },
  pressed: { opacity: 0.7 },
  swatches: { flexDirection: 'row' },
  swatch: {
    width: 18,
    height: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#888',
  },
  label: { fontSize: 16, fontWeight: '600', color: '#000' },
});