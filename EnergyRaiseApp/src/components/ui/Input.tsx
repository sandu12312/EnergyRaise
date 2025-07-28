import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  textStyle?: TextStyle;
  isDarkMode?: boolean;
  rightElement?: React.ReactNode;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  textStyle,
  isDarkMode = false,
  rightElement,
  disabled = false,
}) => {
  // Perfect dark mode matching the provided images
  const theme = {
    background: isDarkMode ? '#2a2a2a' : 'rgba(255, 255, 255, 0.95)',
    border: isDarkMode
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(139, 157, 195, 0.15)',
    borderFocused: isDarkMode ? '#9cb59c' : '#7c9885',
    text: isDarkMode ? '#ffffff' : '#1a202c',
    placeholder: isDarkMode ? '#888888' : '#64748b',
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        style={[
          styles.input,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
            color: theme.text,
            paddingRight: rightElement ? 48 : 16,
          },
          textStyle,
        ]}
      />
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    fontWeight: '400',
    letterSpacing: -0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  rightElement: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
