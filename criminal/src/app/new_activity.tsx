import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useTheme } from "../context/ThemeContext";

export default function NewActivity() {
    const { themeColor } = useTheme();

    return (
        <View style={[styles.container, {backgroundColor: themeColor}]}>
            <Text>Hello World</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});