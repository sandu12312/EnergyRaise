import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  icon?: React.ReactNode;
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
  fullWidth = false,
}) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  const gesture = Gesture.Tap()
    .onBegin(() => {
      if (!disabled && !loading) {
        scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
        opacity.value = withTiming(0.8, { duration: 100 });
        glowOpacity.value = withTiming(1, { duration: 100 });
      }
    })
    .onEnd(() => {
      if (!disabled && !loading) {
        scale.value = withSpring(1, { damping: 12, stiffness: 300 });
        opacity.value = withTiming(1, { duration: 150 });
        glowOpacity.value = withTiming(0, { duration: 300 });
        runOnJS(handlePress)();
      }
    })
    .onTouchesUp(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 150 });
      glowOpacity.value = withTiming(0, { duration: 300 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const getSizeStyles = () => {
    const sizeStyles = {
      default: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 52 },
      sm: { paddingHorizontal: 20, paddingVertical: 12, minHeight: 44 },
      lg: { paddingHorizontal: 28, paddingVertical: 20, minHeight: 60 },
    };
    return sizeStyles[size];
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: 'center',
      letterSpacing: -0.3,
      fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
      fontWeight: '600',
    };

    const variantTextStyles = {
      default: { color: '#ffffff' },
      outline: { color: colors.primary },
      ghost: { color: colors.textPrimary },
    };

    const sizeTextStyles = {
      default: { fontSize: 16, lineHeight: 20 },
      sm: { fontSize: 14, lineHeight: 18 },
      lg: { fontSize: 18, lineHeight: 24 },
    };

    return {
      ...baseStyle,
      ...variantTextStyles[variant],
      ...sizeTextStyles[size],
    };
  };

  const renderButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'default' ? '#ffffff' : colors.primary}
        />
      ) : (
        <>
          {(title || children) && (
            <Text style={[getTextStyle(), textStyle]}>{children || title}</Text>
          )}
          {icon && <>{icon}</>}
        </>
      )}
    </>
  );

  if (variant === 'default') {
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.container,
            getSizeStyles(),
            { width: fullWidth ? '100%' : undefined },
            { opacity: disabled ? 0.5 : 1 },
            style,
            animatedStyle,
          ]}
        >
          {/* Glow effect */}
          <Animated.View
            style={[styles.glowContainer, getSizeStyles(), glowAnimatedStyle]}
          >
            <LinearGradient
              colors={[
                `${colors.buttonGradientStart}40`,
                `${colors.buttonGradientEnd}60`,
                `${colors.buttonGradientStart}40`,
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.glow}
            />
          </Animated.View>

          {/* Main button */}
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.gradientButton, getSizeStyles()]}
          >
            {/* Shimmer effect */}
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.2)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.shimmer}
            />

            <Animated.View style={styles.contentContainer}>
              {renderButtonContent()}
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </GestureDetector>
    );
  }

  // Outline and Ghost variants
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container,
          getSizeStyles(),
          {
            backgroundColor:
              variant === 'outline' ? 'transparent' : 'transparent',
            borderWidth: variant === 'outline' ? 1 : 0,
            borderColor: variant === 'outline' ? colors.border : 'transparent',
            width: fullWidth ? '100%' : undefined,
            opacity: disabled ? 0.5 : 1,
          },
          style,
          animatedStyle,
        ]}
      >
        <Animated.View style={styles.contentContainer}>
          {renderButtonContent()}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  glowContainer: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 20,
    zIndex: 0,
  },
  glow: {
    flex: 1,
    borderRadius: 20,
  },
  gradientButton: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1,
    shadowColor: '#A3C9A8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 1,
  },
});
