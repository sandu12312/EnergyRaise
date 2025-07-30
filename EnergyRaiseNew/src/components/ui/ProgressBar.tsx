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
      {/* Glow effect pentru progress */}
      <Animated.View
        style={[
          styles.glowContainer,
          {
            height: height + 4,
            borderRadius: (height + 4) / 2,
          },
          glowAnimatedStyle,
        ]}
      >
        <LinearGradient
          colors={[
            `${progressColors[0]}30`,
            `${progressColors[1]}50`,
            `${progressColors[0]}30`,
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.glow,
            {
              borderRadius: (height + 4) / 2,
            },
          ]}
        />
      </Animated.View>

      {/* Progress bar principală */}
      <Animated.View
        style={[
          styles.progress,
          {
            height,
            borderRadius: height / 2,
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={progressColors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.progressGradient,
            {
              borderRadius: height / 2,
            },
          ]}
        />
      </Animated.View>

      {/* Indicator rotund la sfârșitul progresului */}
      {showIndicator && (
        <Animated.View
          style={[
            styles.indicatorContainer,
            {
              width: '100%',
              height: height + 4,
            },
            indicatorAnimatedStyle,
          ]}
        >
          <View
            style={[
              styles.indicator,
              {
                width: height + 4,
                height: height + 4,
                borderRadius: (height + 4) / 2,
                right: -((height + 4) / 2),
              },
            ]}
          >
            <LinearGradient
              colors={progressColors}
              style={[
                styles.indicatorGradient,
                {
                  borderRadius: (height + 4) / 2,
                },
              ]}
            />
            {/* Inner white circle pentru contrast */}
            <View
              style={[
                styles.indicatorInner,
                {
                  width: height - 2,
                  height: height - 2,
                  borderRadius: (height - 2) / 2,
                },
              ]}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'visible',
    position: 'relative',
  },
  glowContainer: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    zIndex: 0,
  },
  glow: {
    flex: 1,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    overflow: 'hidden',
  },
  progressGradient: {
    flex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    top: -2,
    left: 0,
    zIndex: 3,
  },
  indicator: {
    position: 'absolute',
    shadowColor: '#A3C9A8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorGradient: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  indicatorInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
  },
});
