import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { EnergyQuiz } from '../../data/energyBalanceData';

interface EnergyQuizSectionProps {
  quizzes: EnergyQuiz[];
  onQuizPress: (quizId: string) => void;
}

export const EnergyQuizSection: React.FC<EnergyQuizSectionProps> = ({
  quizzes,
  onQuizPress,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleQuizPress = (quiz: EnergyQuiz) => {
    // For now, show an alert with quiz info
    Alert.alert(
      quiz.title,
      `${quiz.description}\n\nDurată estimată: ${quiz.estimatedTime}`,
      [
        { text: 'Anulează', style: 'cancel' },
        {
          text: 'Începe Quiz-ul',
          onPress: () => onQuizPress(quiz.id),
          style: 'default',
        },
      ],
    );
  };

  const renderQuizButton = (quiz: EnergyQuiz) => {
    const isPrimary = quiz.type === 'primary';

    return (
      <TouchableOpacity
        key={quiz.id}
        style={[
          styles.quizButton,
          isPrimary ? styles.primaryButton : styles.secondaryButton,
          {
            backgroundColor: isPrimary
              ? '#A3C9A8'
              : isDarkMode
              ? '#4B5563'
              : '#F3F4F6',
            borderColor: isPrimary
              ? '#A3C9A8'
              : isDarkMode
              ? '#6B7280'
              : '#E5E7EB',
          },
        ]}
        onPress={() => handleQuizPress(quiz)}
        activeOpacity={0.8}
      >
        <View style={styles.quizContent}>
          <Text style={styles.quizIcon}>{quiz.icon}</Text>
          <Text
            style={[
              styles.quizTitle,
              {
                color: isPrimary ? '#FFFFFF' : colors.textPrimary,
              },
            ]}
          >
            {quiz.title}
          </Text>
          {isPrimary && <Text style={styles.quizArrow}>→</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  const primaryQuiz = quizzes.find(q => q.type === 'primary');
  const secondaryQuizzes = quizzes.filter(q => q.type === 'secondary');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? '#374151' : '#F8FAFC',
          borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
        },
      ]}
    >
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🎯</Text>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Actualizează-ți Energia
        </Text>
      </View>

      {/* Description */}
      <Text style={[styles.description, { color: colors.textMuted }]}>
        Nivelurile de energie se actualizează automat când completezi quiz-uri
        și exerciții de evaluare.
      </Text>

      {/* Primary Quiz Button */}
      {primaryQuiz && renderQuizButton(primaryQuiz)}

      {/* Secondary Quiz Buttons */}
      <View style={styles.secondaryButtonsContainer}>
        {secondaryQuizzes.map(renderQuizButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  quizButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  primaryButton: {
    paddingVertical: 18,
  },
  secondaryButton: {
    paddingVertical: 14,
  },
  quizContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quizIcon: {
    fontSize: 18,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  quizArrow: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});
