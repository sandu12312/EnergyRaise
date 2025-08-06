import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { EnergyBalanceData } from '../../data/energyBalanceData';

interface EnergyOverviewCardProps {
  data: EnergyBalanceData;
}

export const EnergyOverviewCard: React.FC<EnergyOverviewCardProps> = ({
  data,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#4B5563' : '#F8FAFC',
          borderColor: isDarkMode ? '#6B7280' : '#E5E7EB',
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📊</Text>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Energy Balance
        </Text>
      </View>

      {/* Date */}
      <Text style={[styles.date, { color: colors.textPrimary }]}>
        {data.dayName}, {data.date}
      </Text>

      {/* Energy Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.averageContainer}>
          <Text style={[styles.averageLabel, { color: colors.textMuted }]}>
            Media:
          </Text>
          <Text style={[styles.averageValue, { color: '#A3C9A8' }]}>
            {data.overallAverage}%
          </Text>
        </View>

        <View style={styles.focusContainer}>
          <Text style={[styles.focusLabel, { color: colors.textMuted }]}>
            Focus:
          </Text>
          <View style={styles.focusInfo}>
            <Text style={styles.focusEmoji}>{data.focusArea.emoji}</Text>
            <Text style={[styles.focusText, { color: '#A3C9A8' }]}>
              {data.focusArea.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  averageLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  averageValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  focusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  focusLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  focusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  focusEmoji: {
    fontSize: 16,
  },
  focusText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
