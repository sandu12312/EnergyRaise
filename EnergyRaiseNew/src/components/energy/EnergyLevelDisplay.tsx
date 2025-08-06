import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { EnergyLevel } from '../../data/energyBalanceData';

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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'În creștere':
        return '#A3C9A8';
      case 'Stabil':
        return '#F4A261';
      case 'Scăzut':
        return '#E07A5F';
      default:
        return colors.textMuted;
    }
  };

  return (
    <View style={styles.container}>
      {/* Energy Type Header */}
      <View style={styles.header}>
        <View style={styles.typeInfo}>
          <Text style={styles.emoji}>{energyLevel.emoji}</Text>
          <Text style={[styles.typeName, { color: colors.textPrimary }]}>
            {energyLevel.name}
          </Text>
        </View>
        <View style={styles.statusInfo}>
          <Text
            style={[
              styles.percentage,
              { color: getStatusColor(energyLevel.status) },
            ]}
          >
            {energyLevel.percentage}%
          </Text>
          <Text style={[styles.status, { color: colors.textMuted }]}>
            {energyLevel.status}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        style={[
          styles.progressBarContainer,
          { backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6' },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${energyLevel.percentage}%`,
              backgroundColor: getStatusColor(energyLevel.status),
            },
          ]}
        />
      </View>

      {/* Trend Indicator */}
      <View style={styles.trendContainer}>
        <View style={styles.trendIndicator}>
          <View
            style={[
              styles.trendIcon,
              { backgroundColor: getTrendColor(energyLevel.trend) },
            ]}
          >
            <Text style={styles.trendEmoji}>
              {energyLevel.trend === 'În creștere'
                ? '📈'
                : energyLevel.trend === 'Stabil'
                ? '📊'
                : '📉'}
            </Text>
          </View>
          <Text
            style={[
              styles.trendText,
              { color: getTrendColor(energyLevel.trend) },
            ]}
          >
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
  emoji: {
    fontSize: 24,
  },
  typeName: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusInfo: {
    alignItems: 'flex-end',
  },
  percentage: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  trendContainer: {
    alignItems: 'flex-start',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendEmoji: {
    fontSize: 12,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
