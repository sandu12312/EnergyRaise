import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tw';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'solid';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
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
  icon,
  leftIcon,
  rightIcon,
  fullWidth = false,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
      opacity.value = withTiming(0.8, { duration: 100 });
      glowOpacity.value = withTiming(1, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(1, { damping: 12, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 150 });
      glowOpacity.value = withTiming(0, { duration: 300 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const getSizeClasses = () => {
    const sizes = {
      default: 'px-6 py-4 min-h-[52px]',
      sm: 'px-5 py-3 min-h-[44px]',
      lg: 'px-7 py-5 min-h-[60px]',
    };
    return sizes[size];
  };

  const getTextClasses = () => {
    const baseClasses = 'text-center font-semibold';

    const variantClasses = {
      default: 'text-white',
      outline: 'text-slate-700',
      ghost: 'text-slate-700',
      solid: 'text-white',
    };

    const sizeClasses = {
      default: 'text-base leading-5',
      sm: 'text-sm leading-[18px]',
      lg: 'text-lg leading-6',
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  };

  const renderButtonContent = () => (
    <Animated.View
      style={[tw`flex-row items-center justify-center gap-2`, { zIndex: 10 }]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'default' ? '#ffffff' : '#6B7280'}
        />
      ) : (
        <>
          {(icon || leftIcon) && <>{icon || leftIcon}</>}
          {(title || children) && (
            <Text style={[tw`${getTextClasses()}`, textStyle]}>
              {children || title}
            </Text>
          )}
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </Animated.View>
  );

  if (variant === 'default' || variant === 'solid') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            tw`rounded-2xl items-center justify-center flex-row ${getSizeClasses()} ${
              fullWidth ? 'w-full' : ''
            }`,
            {
              backgroundColor: '#A3C9A8', // Single solid color
              opacity: disabled ? 0.5 : 1,
            },
            style,
            animatedStyle,
          ]}
        >
          {renderButtonContent()}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  // Outline and Ghost variants
  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          tw`rounded-2xl items-center justify-center flex-row ${getSizeClasses()} ${
            fullWidth ? 'w-full' : ''
          }`,
          {
            backgroundColor: variant === 'outline' ? 'transparent' : '#F3F4F6',
            borderWidth: variant === 'outline' ? 2 : 0,
            borderColor: variant === 'outline' ? '#A3C9A8' : 'transparent',
            opacity: disabled ? 0.5 : 1,
          },
          style,
          animatedStyle,
        ]}
      >
        {renderButtonContent()}
      </Animated.View>
    </TouchableOpacity>
  );
};
