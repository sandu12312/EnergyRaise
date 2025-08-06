import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getRandomAffirmation } from '../../data/energyBalanceData';

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
          backgroundColor: isDarkMode ? '#4B5563' : '#F8FAFC',
          borderColor: isDarkMode ? '#6B7280' : '#E5E7EB',
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>⭐</Text>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {category}
        </Text>
      </View>

      {/* Affirmation Quote */}
      <View
        style={[
          styles.quoteContainer,
          { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' },
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
            backgroundColor: isDarkMode ? '#6B7280' : '#E5E7EB',
            borderColor: isDarkMode ? '#9CA3AF' : '#D1D5DB',
          },
        ]}
        onPress={handleGenerateNewAffirmation}
        activeOpacity={0.8}
      >
        <Text
          style={[styles.generateButtonText, { color: colors.textPrimary }]}
        >
          Generează altă afirmație
        </Text>
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
  quoteContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  generateButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
