import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { EnergyBalanceData } from '../../data/energyBalanceData';
import { SvgIcon } from '../ui/SvgIcon';

interface EnergyOverviewCardProps {
  data: EnergyBalanceData;
}

export const EnergyOverviewCard: React.FC<EnergyOverviewCardProps> = ({
  data,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  // Get appropriate color for energy level
  const getEnergyColor = (percentage: number) => {
    if (percentage >= 70) return '#A3C9A8';
    if (percentage >= 50) return '#F4A261';
    return '#E07A5F';
  };

  const energyColor = getEnergyColor(data.overallAverage);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.8)' : '#FFFFFF',
          borderColor: isDarkMode
            ? 'rgba(75, 85, 99, 0.5)'
            : 'rgba(229, 231, 235, 0.8)',
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
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
          <SvgIcon name="chart-bar" size={18} color={colors.accentGreen} />
        </View>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Energy Balance
        </Text>
      </View>

      {/* Date */}
      <View style={styles.dateContainer}>
        <SvgIcon name="calendar" size={16} color={colors.textMuted} />
        <Text style={[styles.date, { color: colors.textMuted }]}>
          {data.dayName}, {data.date}
        </Text>
      </View>

      {/* Energy Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.averageContainer}>
          <Text style={[styles.averageLabel, { color: colors.textMuted }]}>
            Media:
          </Text>
          <View style={styles.averageValueContainer}>
            <Text style={[styles.averageValue, { color: energyColor }]}>
              {data.overallAverage}%
            </Text>
            <View
              style={[
                styles.energyIndicator,
                {
                  backgroundColor: energyColor,
                  opacity: isDarkMode ? 0.8 : 1,
                },
              ]}
            />
          </View>
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: isDarkMode
                ? 'rgba(75, 85, 99, 0.5)'
                : 'rgba(229, 231, 235, 0.8)',
            },
          ]}
        />

        <View style={styles.focusContainer}>
          <Text style={[styles.focusLabel, { color: colors.textMuted }]}>
            Focus:
          </Text>
          <View style={styles.focusInfo}>
            <View
              style={[
                styles.focusIconContainer,
                {
                  backgroundColor: isDarkMode
                    ? 'rgba(163, 201, 168, 0.1)'
                    : 'rgba(163, 201, 168, 0.1)',
                },
              ]}
            >
              <Text style={styles.focusEmoji}>{data.focusArea.emoji}</Text>
            </View>
            <Text style={[styles.focusText, { color: colors.textPrimary }]}>
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
    gap: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageContainer: {
    flex: 1,
    gap: 4,
  },
  averageLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  averageValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  averageValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  energyIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  divider: {
    width: 1,
    height: 36,
    marginHorizontal: 16,
  },
  focusContainer: {
    flex: 1,
    gap: 4,
  },
  focusLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  focusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  focusIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusEmoji: {
    fontSize: 14,
  },
  focusText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
