import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ActivityImagePickerProps {
  imageUri: string | null;
  onImagePicked: (uri: string) => void;
  textColor: string;
}

export function ActivityImagePicker({
  imageUri,
  onImagePicked,
  textColor,
}: ActivityImagePickerProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <Pressable style={styles.pictures} onPress={pickImage}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={[styles.pictureIcon, { color: textColor }]}>📷</Text>
          <Text style={[styles.pictureText, { color: textColor }]}>
            Add Photo
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: '500',
    marginTop: 2,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});