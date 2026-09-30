import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface ActivityDatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  textColor: string;
}

export function ActivityDatePicker({
  date,
  onDateChange,
  textColor,
}: ActivityDatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: textColor }]}>Date</Text>
      <Pressable
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={[styles.dateText, { color: textColor }]}>
          📅 {date.toDateString()}
        </Text>
      </Pressable>

      {showDatePicker && (
        <RNDateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleChange}
        />
      )}
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
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
  },
});