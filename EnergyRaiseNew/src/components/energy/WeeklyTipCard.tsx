import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface WeeklyTip {
  title: string;
  content: string;
  icon: string;
}

interface WeeklyTipCardProps {
  tip: WeeklyTip;
}

export const WeeklyTipCard: React.FC<WeeklyTipCardProps> = ({ tip }) => {
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
      {/* Tip Content */}
      <View style={styles.tipContainer}>
        <View style={styles.tipHeader}>
          <Text style={styles.tipIcon}>{tip.icon}</Text>
          <Text style={[styles.tipTitle, { color: colors.textPrimary }]}>
            {tip.title}
          </Text>
        </View>

        <Text style={[styles.tipContent, { color: colors.textMuted }]}>
          {tip.content}
        </Text>
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
  tipContainer: {
    gap: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipContent: {
    fontSize: 15,
    lineHeight: 22,
  },
});
