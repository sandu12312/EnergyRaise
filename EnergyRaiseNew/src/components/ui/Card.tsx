import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

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
  variant = 'glassmorphism', // Default to glassmorphism ca în imagini
  animated = false,
}) => {
  const { colors, theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

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
  }, [animated, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!animated) return {};

    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  if (variant === 'glassmorphism') {
    return (
      <Animated.View style={[styles.container, style, animatedStyle]}>
        {/* Background blur effect - glassmorphism */}
        <LinearGradient
          colors={
            theme === 'dark'
              ? ['rgba(31, 47, 63, 0.85)', 'rgba(42, 42, 42, 0.9)']
              : ['rgba(255, 255, 255, 0.85)', 'rgba(248, 250, 252, 0.9)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.glassmorphismCard,
            {
              borderColor: colors.cardBorder,
              shadowColor: theme === 'dark' ? '#000000' : colors.primary,
              shadowOpacity: theme === 'dark' ? 0.6 : 0.15,
            },
          ]}
        >
          {/* Optional glow border effect pentru dark mode */}
          {theme === 'dark' && (
            <LinearGradient
              colors={[
                `${colors.accentGreen}20`,
                `${colors.iconEnergy}30`,
                `${colors.accentGreen}20`,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.glowBorder}
            />
          )}

          {/* Content */}
          <View style={styles.cardContentContainer}>{children}</View>
        </LinearGradient>
      </Animated.View>
    );
  }

  if (variant === 'elevated') {
    return (
      <Animated.View style={[styles.container, style, animatedStyle]}>
        <LinearGradient
          colors={[colors.cardBackground, colors.surfaceOverlay]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.elevatedCard,
            {
              borderColor: colors.cardBorder,
              shadowColor:
                theme === 'dark' ? colors.accentGreen : colors.primary,
              shadowOpacity: theme === 'dark' ? 0.3 : 0.12,
            },
          ]}
        >
          {children}
        </LinearGradient>
      </Animated.View>
    );
  }

  // Default variant
  return (
    <Animated.View
      style={[
        styles.defaultCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
          shadowColor: theme === 'dark' ? '#000000' : colors.primary,
          shadowOpacity: theme === 'dark' ? 0.4 : 0.1,
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
  container: {
    position: 'relative',
  },
  glassmorphismCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  elevatedCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  defaultCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  glowBorder: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 21,
    zIndex: 0,
  },
  cardContentContainer: {
    position: 'relative',
    zIndex: 1,
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 16,
  },
});
