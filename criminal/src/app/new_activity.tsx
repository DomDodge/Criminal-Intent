import { useLocalSearchParams } from 'expo-router';
import ActivityForm from '../components/ActivityForm';
import ThemedScreen from '../components/ThemedScreen';
import { useTheme } from '../context/ThemeContext';
import { useActivityForm } from '../hooks/useActivityForm';

export default function NewActivity() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const form = useActivityForm(id);

  return (
    <ThemedScreen dismissKeyboard style={{ padding: 20 }}>
      <ActivityForm form={form} textColor={theme.onPrimary} />
    </ThemedScreen>
  );
}