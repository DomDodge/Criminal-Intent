import { StyleSheet, Text, View } from 'react-native';
import { ActivityFormState } from '../hooks/useActivityForm';
import { ActivityDatePicker } from './ActivityDatePicker';
import { ActivityFormInput } from './ActivityFormInput';
import { ActivityImagePicker } from './ActivityImagePicker';
import AppButton from './AppButton';
import SolvedCheckbox from './SolvedCheckbox';

type Props = {
  form: ActivityFormState;
  textColor: string;
};

export default function ActivityForm({ form, textColor }: Props) {
  return (
    <View style={styles.card}>
      <Text style={[styles.header, { color: textColor }]}>
        {form.isEditing ? 'Edit Activity' : 'New Activity'}
      </Text>

      <View style={styles.topRow}>
        <ActivityImagePicker
          imageUri={form.imageUri}
          onImagePicked={form.setImageUri}
          textColor={textColor}
        />
        <View style={styles.flex}>
          <ActivityFormInput
            label="Title"
            textColor={textColor}
            value={form.title}
            onChangeText={form.setTitle}
            placeholder="Activity title"
          />
        </View>
      </View>

      <ActivityFormInput
        label="Details"
        textColor={textColor}
        value={form.details}
        onChangeText={form.setDetails}
        placeholder="Enter activity details"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        style={styles.textArea}
      />

      <ActivityDatePicker
        date={form.date}
        onDateChange={form.setDate}
        textColor={textColor}
      />

      <SolvedCheckbox
        value={form.isSolved}
        onChange={form.setIsSolved}
        textColor={textColor}
      />

      <AppButton
        label={form.isEditing ? 'Save Changes' : 'Save Activity'}
        onPress={form.save}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, gap: 16, elevation: 5 },
  header: { fontSize: 22, fontWeight: '700' },
  topRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  flex: { flex: 1 },
  textArea: { minHeight: 80 },
});