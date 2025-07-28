import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  isDarkMode?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  isDarkMode = false,
}) => {
  const theme = {
    background: isDarkMode
      ? checked
        ? '#9cb59c'
        : '#2a2a2a'
      : checked
      ? '#7c9885'
      : 'rgba(255, 255, 255, 0.95)',
    border: isDarkMode
      ? checked
        ? '#9cb59c'
        : 'rgba(255, 255, 255, 0.2)'
      : checked
      ? '#7c9885'
      : 'rgba(139, 157, 195, 0.3)',
    checkmark: checked ? '#ffffff' : 'transparent',
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: theme.border,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {checked && (
        <Text style={[styles.checkmark, { color: theme.checkmark }]}>✓</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  checkmark: {
    fontSize: 12,
    fontWeight: '600' as const,
    textAlign: 'center',
    lineHeight: 14,
  },
});
