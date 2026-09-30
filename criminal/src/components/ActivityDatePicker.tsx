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
    // Android closes on selection automatically
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: textColor }]}>Date</Text>
      
      {/* Pressing button toggles the picker open/closed */}
      <Pressable style={styles.dateButton} onPress={toggleDatePicker}>
        <Text style={[styles.dateText, { color: textColor }]}>
          📅 {date.toDateString()}
        </Text>
      </Pressable>

      {showDatePicker && (
        <View style={styles.pickerContainer}>
          <RNDateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleChange}
            // Enforces dark text inside the native picker control
            textColor="#000000"
            themeVariant="light"
          />

          {/* Dismiss button for iOS inline picker */}
          {Platform.OS === 'ios' && (
            <Pressable
              style={styles.doneButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          )}
        </View>
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
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    marginTop: 6,
  },
  doneButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  doneText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
});