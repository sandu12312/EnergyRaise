import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

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
        <Text style={styles.headerIcon}>🎯</Text>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Rezumatul Energiei
        </Text>
      </View>

      {/* Summary Content */}
      <View style={styles.summaryContent}>
        {/* General Average */}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: '#A3C9A8' }]}>
            Media generală:
          </Text>
          <Text style={[styles.summaryValue, { color: '#A3C9A8' }]}>
            {summary.generalAverage}%
          </Text>
        </View>

        {/* Focus Area */}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
            Zona de focalizare:
          </Text>
          <View style={styles.focusAreaContainer}>
            <Text style={styles.focusAreaEmoji}>🏃</Text>
            <Text style={[styles.focusAreaText, { color: colors.textPrimary }]}>
              {summary.focusAreaText}
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={[styles.recommendationsText, { color: '#A3C9A8' }]}>
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
    gap: 8,
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  focusAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  focusAreaEmoji: {
    fontSize: 16,
  },
  focusAreaText: {
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationsContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(163, 201, 168, 0.2)',
  },
  recommendationsText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
});
