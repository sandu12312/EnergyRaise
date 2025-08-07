import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SvgIcon } from '../ui/SvgIcon';

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
          backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.8)' : '#FFFFFF',
          borderColor: isDarkMode
            ? 'rgba(75, 85, 99, 0.5)'
            : 'rgba(229, 231, 235, 0.8)',
        },
      ]}
    >
      {/* Tip Content */}
      <View style={styles.tipContainer}>
        <View style={styles.tipHeader}>
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
            <SvgIcon name="leaf" size={18} color={colors.accentGreen} />
          </View>

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
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
