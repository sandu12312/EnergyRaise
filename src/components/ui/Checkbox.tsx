import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

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
  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const getColors = () => {
    return {
      backgroundColor: checked
        ? isDarkMode
          ? '#9cb59c'
          : '#7c9885'
        : 'transparent',
      borderColor: checked
        ? isDarkMode
          ? '#9cb59c'
          : '#7c9885'
        : isDarkMode
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(139, 157, 195, 0.3)',
      checkmark: '#ffffff',
    };
  };

  const colors = getColors();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
          },
        ]}
      >
        {checked && (
          <View
            style={[styles.checkmark, { backgroundColor: colors.checkmark }]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
});
