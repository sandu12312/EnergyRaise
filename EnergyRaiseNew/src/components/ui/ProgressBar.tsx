import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  progressColors?: string[];
  style?: ViewStyle;
  animated?: boolean;
  showIndicator?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = 'rgba(148, 163, 184, 0.15)',
  progressColors = ['#A3C9A8', '#B2E384'],
  style,
  animated = true,
  showIndicator = true,
}) => {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    if (animated) {
      progressValue.value = withSpring(clampedProgress, {
        damping: 15,
        stiffness: 120,
        mass: 1,
      });
    } else {
      progressValue.value = clampedProgress;
    }
  }, [progress, animated, progressValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const widthPercentage = progressValue.value;
    return {
      width: `${widthPercentage}%`,
    };
  });

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progressValue.value,
      [0, 100],
      [-((height + 4) / 2), 0], // Compensăm pentru jumătatea indicatorului
    );
    return {
      transform: [{ translateX }],
    };
  });

  const glowAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progressValue.value,
      [0, 20, 100],
      [0, 0.6, 0.8],
    );
    return {
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius: height / 2 },
        style,
      ]}
    >
      {/* Simple progress bar */}
      <Animated.View
        style={[
          styles.progress,
          {
            height,
            borderRadius: height / 2,
            backgroundColor: progressColors[0], // Single solid color
          },
          animatedStyle,
        ]}
      />

      {/* Simple indicator */}
      {showIndicator && (
        <Animated.View
          style={[
            styles.indicatorContainer,
            {
              width: '100%',
              height: height,
            },
            indicatorAnimatedStyle,
          ]}
        >
          <View
            style={[
              styles.indicator,
              {
                width: height + 2,
                height: height + 2,
                borderRadius: (height + 2) / 2,
                backgroundColor: progressColors[0],
                right: -((height + 2) / 2),
              },
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
