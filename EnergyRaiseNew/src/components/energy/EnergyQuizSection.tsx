import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { EnergyQuiz } from '../../data/energyBalanceData';
import { SvgIcon } from '../ui/SvgIcon';

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

    // Map emojis to SvgIcon names
    const getIconName = (emoji: string) => {
      switch (emoji) {
        case '🧠':
          return 'brain';
        case '❤️':
          return 'heart';
        case '⚡':
          return 'zap';
        default:
          return 'brain';
      }
    };

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
              ? 'rgba(75, 85, 99, 0.2)'
              : 'rgba(243, 244, 246, 0.9)',
          },
        ]}
        onPress={() => handleQuizPress(quiz)}
        activeOpacity={0.8}
      >
        <View style={styles.quizContent}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isPrimary
                  ? 'rgba(255, 255, 255, 0.2)'
                  : isDarkMode
                  ? 'rgba(163, 201, 168, 0.1)'
                  : 'rgba(163, 201, 168, 0.2)',
              },
            ]}
          >
            <SvgIcon
              name={getIconName(quiz.icon)}
              size={isPrimary ? 18 : 16}
              color={isPrimary ? '#FFFFFF' : colors.textPrimary}
            />
          </View>

          <Text
            style={[
              styles.quizTitle,
              {
                color: isPrimary ? '#FFFFFF' : colors.textPrimary,
                fontSize: isPrimary ? 16 : 14,
              },
            ]}
          >
            {quiz.title}
          </Text>

          {isPrimary && (
            <View style={styles.arrowContainer}>
              <SvgIcon name="arrow-right" size={16} color="#FFFFFF" />
            </View>
          )}
        </View>

        {isPrimary && (
          <Text style={styles.timeEstimate}>
            Durată estimată: {quiz.estimatedTime}
          </Text>
        )}
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
          backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.8)' : '#FFFFFF',
          borderColor: isDarkMode
            ? 'rgba(75, 85, 99, 0.5)'
            : 'rgba(229, 231, 235, 0.8)',
        },
      ]}
    >
      {/* Section Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.headerIconContainer,
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
    gap: 10,
    marginBottom: 12,
  },
  headerIconContainer: {
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
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  quizButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  primaryButton: {
    paddingVertical: 16,
  },
  secondaryButton: {
    paddingVertical: 12,
    flex: 1,
  },
  quizContent: {
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
  quizTitle: {
    fontWeight: '600',
    flex: 1,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeEstimate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    fontWeight: '500',
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});
