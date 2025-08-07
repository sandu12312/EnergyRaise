import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getRandomAffirmation } from '../../data/energyBalanceData';
import { SvgIcon } from '../ui/SvgIcon';

interface AffirmationCardProps {
  initialAffirmation: string;
  category: string;
}

export const AffirmationCard: React.FC<AffirmationCardProps> = ({
  initialAffirmation,
  category,
}) => {
  const { theme, colors } = useTheme();
  const [currentAffirmation, setCurrentAffirmation] =
    useState(initialAffirmation);
  const isDarkMode = theme === 'dark';

  const handleGenerateNewAffirmation = () => {
    const newAffirmation = getRandomAffirmation();
    setCurrentAffirmation(newAffirmation);
  };

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
          <SvgIcon name="star" size={18} color={colors.accentGreen} />
        </View>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {category}
        </Text>
      </View>

      {/* Affirmation Quote */}
      <View
        style={[
          styles.quoteContainer,
          {
            backgroundColor: isDarkMode
              ? 'rgba(75, 85, 99, 0.2)'
              : 'rgba(243, 244, 246, 0.7)',
            borderColor: isDarkMode
              ? 'rgba(75, 85, 99, 0.5)'
              : 'rgba(229, 231, 235, 0.8)',
          },
        ]}
      >
        <Text style={[styles.quoteText, { color: colors.textPrimary }]}>
          "{currentAffirmation}"
        </Text>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          {
            backgroundColor: isDarkMode
              ? 'rgba(75, 85, 99, 0.2)'
              : 'rgba(163, 201, 168, 0.1)',
          },
        ]}
        onPress={handleGenerateNewAffirmation}
        activeOpacity={0.7}
      >
        <View style={styles.generateButtonContent}>
          <SvgIcon name="zap" size={16} color={colors.accentGreen} />
          <Text
            style={[styles.generateButtonText, { color: colors.textPrimary }]}
          >
            Generează altă afirmație
          </Text>
        </View>
      </TouchableOpacity>
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
  quoteContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  generateButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  generateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
