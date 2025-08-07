import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SvgIcon } from '../ui/SvgIcon';

interface EnergySummary {
  generalAverage: number;
  focusAreaText: string;
  recommendations: string;
}

interface EnergySummaryCardProps {
  summary: EnergySummary;
}

export const EnergySummaryCard: React.FC<EnergySummaryCardProps> = ({
  summary,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  // Get appropriate color for energy level
  const getEnergyColor = (percentage: number) => {
    if (percentage >= 70) return '#A3C9A8';
    if (percentage >= 50) return '#F4A261';
    return '#E07A5F';
  };

  const averageColor = getEnergyColor(summary.generalAverage);

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
          <SvgIcon name="target" size={18} color={colors.accentGreen} />
        </View>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Rezumatul Energiei
        </Text>
      </View>

      {/* Summary Content */}
      <View style={styles.summaryContent}>
        {/* General Average */}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textPrimary }]}>
            Media generală:
          </Text>
          <View style={styles.averageContainer}>
            <Text style={[styles.summaryValue, { color: averageColor }]}>
              {summary.generalAverage}%
            </Text>
            <View
              style={[
                styles.averageIndicator,
                { backgroundColor: averageColor },
              ]}
            />
          </View>
        </View>

        {/* Focus Area */}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textPrimary }]}>
            Zona de focalizare:
          </Text>
          <View style={styles.focusAreaContainer}>
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
              <SvgIcon name="zap" size={14} color={colors.accentGreen} />
            </View>
            <Text style={[styles.focusAreaText, { color: colors.textPrimary }]}>
              {summary.focusAreaText}
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        <View
          style={[
            styles.recommendationsContainer,
            {
              borderTopColor: isDarkMode
                ? 'rgba(75, 85, 99, 0.5)'
                : 'rgba(229, 231, 235, 0.8)',
            },
          ]}
        >
          <Text
            style={[styles.recommendationsText, { color: colors.textPrimary }]}
          >
            {summary.recommendations}
          </Text>
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
    marginBottom: 16,
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
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryValue: {
    fontSize: 17,
    fontWeight: '700',
  },
  averageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  focusAreaContainer: {
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
  focusAreaText: {
    fontSize: 15,
    fontWeight: '600',
  },
  recommendationsContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  recommendationsText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
});
