import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface ActivityFormInputProps extends TextInputProps {
  label: string;
  textColor: string;
}

export function ActivityFormInput({
  label,
  textColor,
  style,
  ...textInputProps
}: ActivityFormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: textColor }, style]}
        placeholderTextColor="#8e8e93"
        {...textInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
});