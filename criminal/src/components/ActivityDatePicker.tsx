import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';

interface ActivityDatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

// Build "YYYY-MM-DD" from local parts (toISOString would shift the day by timezone)
const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;

export function ActivityDatePicker({ date, onDateChange }: ActivityDatePickerProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const selectedKey = toKey(date);

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: theme.onPrimary }]}>Date</Text>

      <Pressable
        style={[styles.dateButton, { borderColor: theme.onPrimary }]}
        onPress={() => setOpen(true)}
      >
        <Text style={[styles.dateText, { color: theme.onPrimary }]}>
          📅 {date.toDateString()}
        </Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)} // Android back button
      >
        <View style={styles.overlay}>
          {/* Tapping the dimmed area closes the picker */}
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />

          <View style={[styles.card, { backgroundColor: theme.primary }]}>
            <Calendar
              key={theme.name} // forces a re-render when the theme changes
              current={selectedKey}
              onDayPress={(day) => {
                onDateChange(new Date(day.year, day.month - 1, day.day));
                setOpen(false);
              }}
              markedDates={{ [selectedKey]: { selected: true } }}
              theme={{
                calendarBackground: theme.primary,
                monthTextColor: theme.onPrimary,
                dayTextColor: theme.onPrimary,
                todayTextColor: theme.onPrimary,
                textSectionTitleColor: theme.onPrimary,
                textDisabledColor: theme.onPrimary + '55',
                arrowColor: theme.onPrimary,
                selectedDayBackgroundColor: theme.secondary,
                selectedDayTextColor: theme.onSecondary,
              }}
            />

            <Pressable
              style={[styles.closeButton, { backgroundColor: theme.secondary }]}
              onPress={() => setOpen(false)}
            >
              <Text style={[styles.closeText, { color: theme.onSecondary }]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600' },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  dateText: { fontSize: 15, fontWeight: '600' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 380,
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: { fontSize: 16, fontWeight: '600' },
});