import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Svg, { Path, LinearGradient, Defs, Stop } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color?: string;
  gradient?: string[];
  onPress: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const ChartIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 17l-6.4 4.2L8 14l-6-4.8h7.6L12 2z"
      fill={color}
    />
    <Path
      d="M12 6l1.2 3.6H17l-3 2.4 1.2 3.6L12 13l-3.2 2.6L10 12l-3-2.4h3.8L12 6z"
      fill="white"
      opacity="0.3"
    />
  </Svg>
);

const ActionButton: React.FC<{
  title: string;
  icon: string;
  color?: string;
  gradient?: string[];
  onPress: () => void;
}> = ({ title, icon, color, gradient, onPress }) => {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const iconColor = color || colors.accentGreen;
  const textColor = isDark ? '#FFFFFF' : '#1E293B';

  const getIcon = () => {
    switch (icon) {
      case 'chart':
        return <ChartIcon size={36} color={iconColor} />;
      case 'star':
        return <StarIcon size={36} color={iconColor} />;
      default:
        return <ChartIcon size={36} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        {
          backgroundColor: isDark
            ? 'rgba(31, 47, 63, 0.8)'
            : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(139, 157, 195, 0.15)',
          shadowColor: isDark ? iconColor : colors.accentGreen,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={`${title} action button`}
      accessibilityRole="button"
    >
      <View
        style={[
          styles.iconBackground,
          {
            backgroundColor: isDark
              ? 'rgba(31, 47, 63, 0.5)'
              : 'rgba(255, 255, 255, 0.8)',
          },
        ]}
      >
        <View style={styles.iconContainer}>{getIcon()}</View>
      </View>
      <Text
        style={[styles.actionTitle, { color: textColor }]}
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <StarIcon size={22} color={colors.accentGreen} />
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Acțiuni Rapide
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        style={[
          styles.actionsGrid,
          {
            backgroundColor: isDark
              ? 'rgba(31, 47, 63, 0.2)'
              : 'rgba(255, 255, 255, 0.5)',
          },
        ]}
      >
        {actions.map(action => (
          <ActionButton
            key={action.id}
            title={action.title}
            icon={action.icon}
            color={action.color}
            gradient={action.gradient}
            onPress={action.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 18,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    minHeight: 130,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    textAlign: 'center',
    marginHorizontal: 4,
  },
});
