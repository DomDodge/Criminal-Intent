import { useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function useActivityForm(id?: string) {
  const { addActivity, updateActivity, getActivity } = useTheme();

  const existing = id ? getActivity(id) : undefined;
  const isEditing = !!existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [details, setDetails] = useState(existing?.details ?? '');
  const [imageUri, setImageUri] = useState<string | null>(existing?.imageUri ?? null);
  const [date, setDate] = useState<Date>(existing ? new Date(existing.date) : new Date());
  const [isSolved, setIsSolved] = useState<boolean>(existing?.solved ?? false);

  const save = () => {
    const data = {
      title,
      details,
      imageUri,
      date: date.getTime(),
      solved: isSolved,
    };

    if (isEditing && id) {
      updateActivity(id, data);
    } else {
      addActivity(data);
    }

    Alert.alert('Activity has now been saved!');
  };

  return {
    isEditing,
    title, setTitle,
    details, setDetails,
    imageUri, setImageUri,
    date, setDate,
    isSolved, setIsSolved,
    save,
  };
}

// Lets components type the `form` prop without repeating anything
export type ActivityFormState = ReturnType<typeof useActivityForm>;