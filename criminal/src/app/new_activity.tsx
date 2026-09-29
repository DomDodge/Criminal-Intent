import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function NewActivity() {
  const { themeColor, addActivity, updateActivity, getActivity } = useTheme();
  const router = useRouter();

  // If an id is passed in, we're editing an existing crime
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = id ? getActivity(id) : undefined;
  const isEditing = !!existing;

  // State inputs (pre-filled when editing)
  const [title, setTitle] = useState(existing?.title ?? '');
  const [details, setDetails] = useState(existing?.details ?? '');

  // Pictures state
  const [imageUri, setImageUri] = useState<string | null>(existing?.imageUri ?? null);

  // Date state defaults to today's date (or the saved date when editing)
  const [date, setDate] = useState<Date>(existing ? new Date(existing.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Solved state variable
  const [isSolved, setIsSolved] = useState<boolean>(existing?.solved ?? false);

  // Image Picker Handler
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Date picker handler
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Handle Save: update if editing, otherwise append to the list
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
    <View style={[styles.container, { backgroundColor: themeColor || '#f5f5f7' }]}>
      <View style={styles.card}>
        <Text style={styles.headerText}>{isEditing ? 'Edit Activity' : 'New Activity'}</Text>

        {/* Top Section: Pictures + Title side-by-side */}
        <View style={styles.sides}>
          <Pressable style={styles.pictures} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.pictureIcon}>📷</Text>
                <Text style={styles.pictureText}>Add Photo</Text>
              </View>
            )}
          </Pressable>

          <View style={styles.titles}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Activity title"
              placeholderTextColor="#8e8e93"
            />
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={details}
            onChangeText={setDetails}
            placeholder="Enter activity details"
            placeholderTextColor="#8e8e93"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Date Selector Button */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>📅 {date.toDateString()}</Text>
          </Pressable>
        </View>

        {/* Native Date Picker Component */}
        {showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateChange}
          />
        )}

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
          <Text style={styles.checkboxLabel}>Mark as Solved</Text>
        </Pressable>

        {/* Save Button */}
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{isEditing ? 'Save Changes' : 'Save Activity'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  sides: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  pictures: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f7',
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureIcon: {
    fontSize: 20,
  },
  pictureText: {
    fontSize: 10,
    color: '#8e8e93',
    fontWeight: '500',
    marginTop: 2,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  titles: {
    flex: 1,
    gap: 6,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3a3a3c',
  },
  input: {
    backgroundColor: '#f2f2f7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  textArea: {
    minHeight: 80,
  },
  dateButton: {
    backgroundColor: '#e5f1ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
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
    color: '#1c1c1e',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});