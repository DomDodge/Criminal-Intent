import Checkbox from 'expo-checkbox';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ActivityDatePicker } from '../components/ActivityDatePicker';
import { ActivityFormInput } from '../components/ActivityFormInput';
import { ActivityImagePicker } from '../components/ActivityImagePicker';
import { useTheme } from '../context/ThemeContext';

export default function NewActivity() {
  const { themeColor, addActivity, updateActivity, getActivity } = useTheme();
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = id ? getActivity(id) : undefined;
  const isEditing = !!existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [details, setDetails] = useState(existing?.details ?? '');
  const [imageUri, setImageUri] = useState<string | null>(
    existing?.imageUri ?? null
  );
  const [date, setDate] = useState<Date>(
    existing ? new Date(existing.date) : new Date()
  );
  const [isSolved, setIsSolved] = useState<boolean>(existing?.solved ?? false);

  const titleTextColor =
    themeColor.toLowerCase() === '#ffffff' ? '#000000' : '#ffffff';

  const handleSave = () => {
    const activityData = {
      title,
      details,
      imageUri,
      date: date.getTime(),
      solved: isSolved,
    };

    if (isEditing && id) {
      updateActivity(id, activityData);
    } else {
      addActivity(activityData);
    }

    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.container,
          { backgroundColor: themeColor || '#f5f5f7' },
        ]}
      >
        <View style={styles.card}>
          <Text style={[styles.headerText, { color: titleTextColor }]}>
            {isEditing ? 'Edit Activity' : 'New Activity'}
          </Text>

          {/* Top Section: Pictures + Title */}
          <View style={styles.sides}>
            <ActivityImagePicker
              imageUri={imageUri}
              onImagePicked={setImageUri}
              textColor={titleTextColor}
            />
            <View style={styles.titles}>
              <ActivityFormInput
                label="Title"
                textColor={titleTextColor}
                value={title}
                onChangeText={setTitle}
                placeholder="Activity title"
              />
            </View>
          </View>

          {/* Details Section */}
          <ActivityFormInput
            label="Details"
            textColor={titleTextColor}
            value={details}
            onChangeText={setDetails}
            placeholder="Enter activity details"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.textArea}
          />

          {/* Date Picker Component */}
          <ActivityDatePicker
            date={date}
            onDateChange={setDate}
            textColor={titleTextColor}
          />

          {/* Solved Checkbox */}
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => setIsSolved(!isSolved)}
          >
            <Checkbox
              value={isSolved}
              onValueChange={setIsSolved}
              color={isSolved ? '#007AFF' : undefined}
              style={styles.checkbox}
            />
            <Text style={[styles.checkboxLabel, { color: titleTextColor }]}>
              Mark as Solved
            </Text>
          </Pressable>

          {/* Save Button */}
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={[styles.saveButtonText, { color: titleTextColor }]}>
              {isEditing ? 'Save Changes' : 'Save Activity'}
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 16,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
  },
  sides: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  titles: {
    flex: 1,
  },
  textArea: {
    minHeight: 80,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});