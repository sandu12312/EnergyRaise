import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { SvgIcon } from './SvgIcon';
import tw from '../../utils/tw';

interface RotatingStarProps {
  size?: number;
  colors: string[];
}

// Reusable RotatingStar component (CONTRIBUTING.md rule #33)
export const RotatingStar: React.FC<RotatingStarProps> = React.memo(
  ({ size = 32, colors }) => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
      // Optimized animation using useSharedValue (CONTRIBUTING.md rule #14)
      rotation.value = withRepeat(
        withTiming(360, { duration: 15000, easing: Easing.linear }),
        -1, // -1 for infinite
        false,
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.95, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      );
    }, [rotation, scale]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
      };
    });

    return (
      <Animated.View
        style={[
          tw`items-center justify-center`,
          { width: size, height: size },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            tw`items-center justify-center rounded-full`,
            { width: size * 0.8, height: size * 0.8 },
          ]}
        >
          <SvgIcon name="heart" size={size * 0.6} color="white" />
        </LinearGradient>
      </Animated.View>
    );
  },
);
