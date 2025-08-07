import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { EnergyLevel } from '../../data/energyBalanceData';
import { SvgIcon } from '../ui/SvgIcon';

interface EnergyLevelDisplayProps {
  energyLevel: EnergyLevel;
}

export const EnergyLevelDisplay: React.FC<EnergyLevelDisplayProps> = ({
  energyLevel,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bun':
        return '#A3C9A8';
      case 'Moderat':
        return '#F4A261';
      case 'Scăzut':
        return '#E07A5F';
      default:
        return colors.textMuted;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'În creștere':
        return 'arrow-up-right';
      case 'Stabil':
        return 'minus';
      case 'Scăzut':
        return 'arrow-down-right';
      default:
        return 'minus';
    }
  };

  const statusColor = getStatusColor(energyLevel.status);

  return (
    <View style={styles.container}>
      {/* Energy Type Header */}
      <View style={styles.header}>
        <View style={styles.typeInfo}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isDarkMode
                  ? 'rgba(163, 201, 168, 0.1)'
                  : 'rgba(163, 201, 168, 0.1)',
              },
            ]}
          >
            <Text style={styles.emoji}>{energyLevel.emoji}</Text>
          </View>
          <Text style={[styles.typeName, { color: colors.textPrimary }]}>
            {energyLevel.name}
          </Text>
        </View>
        <View style={styles.statusInfo}>
          <Text style={[styles.percentage, { color: statusColor }]}>
            {energyLevel.percentage}%
          </Text>
          <Text style={[styles.status, { color: colors.textMuted }]}>
            {energyLevel.status}
          </Text>
        </View>
      </View>

      {/* Progress Bar - Redesigned for minimalism */}
      <View
        style={[
          styles.progressBarContainer,
          {
            backgroundColor: isDarkMode
              ? 'rgba(75, 85, 99, 0.3)'
              : 'rgba(243, 244, 246, 0.7)',
          },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${energyLevel.percentage}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>

      {/* Trend Indicator - Simplified */}
      <View style={styles.trendContainer}>
        <View
          style={[
            styles.trendIndicator,
            {
              backgroundColor: isDarkMode
                ? 'rgba(75, 85, 99, 0.2)'
                : 'rgba(243, 244, 246, 0.9)',
            },
          ]}
        >
          <SvgIcon
            name={getTrendIcon(energyLevel.trend)}
            size={14}
            color={statusColor}
          />
          <Text style={[styles.trendText, { color: colors.textPrimary }]}>
            {energyLevel.trend}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 16,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusInfo: {
    alignItems: 'flex-end',
  },
  percentage: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  trendContainer: {
    alignItems: 'flex-start',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
