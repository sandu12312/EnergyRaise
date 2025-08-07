import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

interface NotificationBellProps {
  size?: number;
  onPress?: () => void;
  hasNotifications?: boolean;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  size = 24,
  onPress,
  hasNotifications = false,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          stroke={colors.textMuted}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          stroke={colors.textMuted}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {hasNotifications && (
          <Path
            d="M17 2C17 2 17 4 17 4C17 4 17 4.5 16.5 5C16.5 5 14 5 12 8"
            stroke={colors.accentGreen}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </Svg>
      {hasNotifications && (
        <Svg
          width={8}
          height={8}
          viewBox="0 0 8 8"
          style={styles.notificationDot}
        >
          <Path
            d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z"
            fill={colors.accentGreen}
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});
