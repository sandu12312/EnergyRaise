import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
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
  onPress: () => void;
}> = ({ title, icon, onPress }) => {
  const { colors } = useTheme();

  const getIcon = () => {
    switch (icon) {
      case 'chart':
        return <ChartIcon size={32} color={colors.textMuted} />;
      case 'star':
        return <StarIcon size={32} color={colors.accentGreen} />;
      default:
        return <ChartIcon size={32} color={colors.textMuted} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <Text style={[styles.actionTitle, { color: colors.textPrimary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <StarIcon size={20} color={colors.accentGreen} />
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Acțiuni Rapide
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsGrid}>
        {actions.map(action => (
          <ActionButton
            key={action.id}
            title={action.title}
            icon={action.icon}
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 120,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    textAlign: 'center',
  },
});
