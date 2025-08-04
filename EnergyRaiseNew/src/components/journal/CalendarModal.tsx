import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { generateCalendarData, CalendarDay } from '../../data/journalData';
import { SvgIcon } from '../ui/SvgIcon';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onDateSelect,
}) => {
  const { theme, colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie',
  ];

  const weekDays = ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa'];

  const calendarData = generateCalendarData(currentMonth, currentYear);

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDatePress = (day: CalendarDay) => {
    const selectedDate = new Date(currentYear, currentMonth, day.date);
    onDateSelect?.(selectedDate);
    onClose();
  };

  const renderCalendarDay = (day: CalendarDay, index: number) => {
    const isDarkMode = theme === 'dark';

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.dayButton,
          day.hasEntry && [styles.dayWithEntry, { backgroundColor: '#A3C9A8' }],
          day.isToday && [
            styles.todayButton,
            { backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB' },
          ],
        ]}
        onPress={() => handleDatePress(day)}
      >
        <Text
          style={[
            styles.dayText,
            { color: day.hasEntry ? '#FFFFFF' : colors.textPrimary },
            day.isToday && { color: colors.textPrimary },
          ]}
        >
          {day.date}
        </Text>
      </TouchableOpacity>
    );
  };

  // Fill empty slots at the beginning of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const emptySlots = Array(firstDayOfMonth).fill(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF' },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              📖 Calendar Jurnal
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <SvgIcon name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Month Navigation */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity
              onPress={() => navigateMonth('prev')}
              style={[
                styles.navButton,
                { backgroundColor: theme === 'dark' ? '#4B5563' : '#F3F4F6' },
              ]}
            >
              <SvgIcon
                name="chevron-left"
                size={20}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <Text style={[styles.monthYear, { color: colors.textPrimary }]}>
              {months[currentMonth]} {currentYear}
            </Text>

            <TouchableOpacity
              onPress={() => navigateMonth('next')}
              style={[
                styles.navButton,
                { backgroundColor: theme === 'dark' ? '#4B5563' : '#F3F4F6' },
              ]}
            >
              <SvgIcon
                name="chevron-right"
                size={20}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* Week Days Headers */}
          <View style={styles.weekDaysContainer}>
            {weekDays.map((day, index) => (
              <Text
                key={index}
                style={[styles.weekDayText, { color: colors.textMuted }]}
              >
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <ScrollView style={styles.calendarContainer}>
            <View style={styles.calendarGrid}>
              {/* Empty slots for days before the first day of the month */}
              {emptySlots.map((_, index) => (
                <View key={`empty-${index}`} style={styles.emptyDay} />
              ))}

              {/* Calendar days */}
              {calendarData.map((day, index) => renderCalendarDay(day, index))}
            </View>
          </ScrollView>

          {/* Legend */}
          <View style={styles.legend}>
            <Text style={[styles.legendTitle, { color: colors.textPrimary }]}>
              Apasă pe o zi pentru a vedea sau edita intrarea din jurnal
            </Text>

            <View style={styles.legendItems}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: '#E5E7EB' }]}
                />
                <Text style={[styles.legendText, { color: colors.textMuted }]}>
                  Cu intrare
                </Text>
              </View>

              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: '#A3C9A8' }]}
                />
                <Text style={[styles.legendText, { color: colors.textMuted }]}>
                  Astăzi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '500',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  calendarContainer: {
    maxHeight: 300,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 2,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  dayWithEntry: {
    // backgroundColor set dynamically
  },
  todayButton: {
    // backgroundColor set dynamically
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  legend: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  legendTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 12,
  },
});
