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
  const getInputColors = () => {
    return {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
      borderColor: isDarkMode
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(139, 157, 195, 0.15)',
      borderFocused: isDarkMode ? '#9cb59c' : '#7c9885',
      text: isDarkMode ? '#ffffff' : '#1a202c',
      placeholder: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : '#a0aec0',
    };
  };

  const colors = getInputColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
        style,
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            paddingRight: rightElement ? 40 : 12,
          },
          textStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
      />
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.2,
    paddingVertical: 0,
  },
  rightElement: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
  },
});
