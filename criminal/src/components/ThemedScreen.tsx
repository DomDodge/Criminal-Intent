import { ReactNode } from 'react';
import {
    Keyboard,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  dismissKeyboard?: boolean;
};

export default function ThemedScreen({ children, style, dismissKeyboard = false }: Props) {
  const { theme } = useTheme();

  const content = (
    <View style={[styles.container, { backgroundColor: theme.primary }, style]}>
      {children}
    </View>
  );

  if (!dismissKeyboard) return content;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {content}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});