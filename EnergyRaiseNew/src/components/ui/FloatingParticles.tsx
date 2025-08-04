import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../utils/tw';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface FloatingParticleProps {
  delay: number;
  colors: string[];
}

// Single particle component
const FloatingParticle: React.FC<FloatingParticleProps> = React.memo(
  ({ delay, colors }) => {
    // Animation values using useSharedValue for performance (CONTRIBUTING.md rule #14)
    const position = useSharedValue({
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
    });
    const size = useSharedValue(Math.random() * 8 + 4);
    const opacity = useSharedValue(0);

    // Start animation on mount
    useEffect(() => {
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);
      return () => clearTimeout(timer); // Cleanup timer (CONTRIBUTING.md rule #16)
    }, [delay]);

    const startAnimation = () => {
      // Randomize new position
      const newX = Math.random() * screenWidth;
      const newY = Math.random() * screenHeight;

      // Animate to new position
      position.value = {
        x: newX,
        y: newY,
      };

      // Fade in and out
      opacity.value = withSequence(
        withTiming(Math.random() * 0.5 + 0.2, { duration: 2000 }),
        withTiming(0, { duration: 2000 }, () => {
          runOnJS(startAnimation)();
        }),
      );

      // Animate size
      size.value = withSequence(
        withTiming(Math.random() * 12 + 6, { duration: 4000 }),
        withTiming(Math.random() * 8 + 4, { duration: 3000 }),
      );
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: position.value.x },
          { translateY: position.value.y },
          { scale: size.value / 10 },
        ],
        opacity: opacity.value,
      };
    });

    return (
      <Animated.View style={[tw`absolute h-2 w-2 rounded-full`, animatedStyle]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`w-full h-full rounded-full`}
        />
      </Animated.View>
    );
  },
);

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
}

// Main FloatingParticles component (CONTRIBUTING.md rule #33 - reusable components)
export const FloatingParticles: React.FC<FloatingParticlesProps> = React.memo(
  ({
    count = 20,
    colors = ['rgba(163, 201, 168, 0.188)', 'rgba(178, 227, 132, 0.313)'],
  }) => {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 150} colors={colors} />
        ))}
      </>
    );
  },
);
