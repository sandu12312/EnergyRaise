import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  isDarkMode?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
  textStyle,
  children,
  isDarkMode = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    const sizeStyles = {
      default: { paddingHorizontal: 20, paddingVertical: 14, minHeight: 48 },
      sm: { paddingHorizontal: 16, paddingVertical: 10, minHeight: 40 },
      lg: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 52 },
    };

    const variantStyles = {
      default: {
        backgroundColor: isDarkMode ? '#9cb59c' : '#7c9885',
        borderWidth: 0,
        shadowColor: isDarkMode ? '#9cb59c' : '#7c9885',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.25 : 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: isDarkMode ? '#9cb59c' : 'rgba(139, 157, 195, 0.3)',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: 'center',
      letterSpacing: -0.2,
      fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    };

    const variantTextStyles = {
      default: { color: '#ffffff', fontWeight: '600' as const },
      outline: {
        color: isDarkMode ? '#9cb59c' : '#2d3142',
        fontWeight: '500' as const,
      },
      ghost: {
        color: isDarkMode ? '#ffffff' : '#2d3142',
        fontWeight: '400' as const,
      },
    };

    const sizeTextStyles = {
      default: { fontSize: 16, lineHeight: 20 },
      sm: { fontSize: 14, lineHeight: 18 },
      lg: { fontSize: 17, lineHeight: 22 },
    };

    return {
      ...baseStyle,
      ...variantTextStyles[variant],
      ...sizeTextStyles[size],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'default'
              ? '#ffffff'
              : isDarkMode
              ? '#9cb59c'
              : '#7c9885'
          }
        />
      ) : (
        <>
          {children}
          {title && <Text style={[getTextStyle(), textStyle]}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});
