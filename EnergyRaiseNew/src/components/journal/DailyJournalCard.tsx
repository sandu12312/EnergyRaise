import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getCurrentDateFormatted } from '../../data/journalData';

interface DailyJournalCardProps {
  onPress: () => void;
}

export const DailyJournalCard: React.FC<DailyJournalCardProps> = ({
  onPress,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';
  const currentDate = getCurrentDateFormatted();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#4B5563' : '#F9FAFB',
          borderColor: isDarkMode ? '#6B7280' : '#E5E7EB',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Icon and Title */}
        <View style={styles.header}>
          <Text style={styles.icon}>📖</Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Jurnal Zilnic
          </Text>
        </View>

        {/* Current Date */}
        <Text style={[styles.date, { color: colors.textPrimary }]}>
          {currentDate}
        </Text>

        {/* Calendar Icon */}
        <View style={styles.calendarContainer}>
          <View
            style={[
              styles.calendarIcon,
              { backgroundColor: isDarkMode ? '#6B7280' : '#E5E7EB' },
            ]}
          >
            <Text style={styles.calendarNumber}>{new Date().getDate()}</Text>
          </View>
          <Text style={[styles.calendarText, { color: colors.textMuted }]}>
            Apasă pentru a vedea calendar-ul complet
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  content: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  calendarIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A3C9A8',
  },
  calendarText: {
    fontSize: 14,
    flex: 1,
  },
});
