import Checkbox from 'expo-checkbox';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  textColor: string;
  label?: string;
};

export default function SolvedCheckbox({
  value,
  onChange,
  textColor,
  label = 'Mark as Solved',
}: Props) {
  return (
    <Pressable style={styles.row} onPress={() => onChange(!value)}>
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? '#007AFF' : undefined}
        style={styles.checkbox}
      />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  checkbox: { width: 22, height: 22, borderRadius: 6 },
  label: { fontSize: 16, fontWeight: '500' },
});