import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tw';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'glassmorphism' | 'elevated';
  animated?: boolean;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'glassmorphism', // Default to glassmorphism
  animated = false,
}) => {
  const { theme, colors, updateCounter } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Create a unique key that changes when theme changes
  const cardKey = `${theme}-v${updateCounter || 0}`;

  React.useEffect(() => {
    if (animated) {
      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
        mass: 0.8,
      });
      opacity.value = withSpring(1, {
        damping: 15,
        stiffness: 120,
      });
    }
  }, [animated, scale, opacity, theme, updateCounter]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!animated) return {};

    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  if (variant === 'glassmorphism') {
    return (
      <Animated.View
        key={`card-glass-${cardKey}`}
        style={[
          styles.simplifiedCard,
          {
            backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
          },
          style,
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  if (variant === 'elevated') {
    return (
      <Animated.View
        key={`card-elevated-${cardKey}`}
        style={[
          styles.simplifiedCard,
          {
            backgroundColor: theme === 'dark' ? '#4B5563' : '#F9FAFB',
            borderColor: theme === 'dark' ? '#6B7280' : '#D1D5DB',
          },
          style,
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  // Default variant
  return (
    <Animated.View
      key={`card-default-${cardKey}`}
      style={[
        styles.simplifiedCard,
        {
          backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
          borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        },
        style,
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.cardContent, style]}>{children}</View>;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
  return <View style={[styles.cardHeader, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  simplifiedCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  cardContent: {
    padding: 0, // Already padded by simplifiedCard
  },
  cardHeader: {
    marginBottom: 16,
  },
});
