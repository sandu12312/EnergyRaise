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
      backgroundColor: isDarkMode ? '#374151' : '#ffffff',
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      borderFocused: '#A3C9A8',
      text: isDarkMode ? '#ffffff' : '#1F2937',
      placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
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
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    paddingVertical: 0,
  },
  rightElement: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
});
