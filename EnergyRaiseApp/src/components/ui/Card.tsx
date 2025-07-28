import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isDarkMode?: boolean;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  isDarkMode = false,
}) => {
  const cardStyle = {
    backgroundColor: isDarkMode ? '#2a2a2a' : 'rgba(255, 255, 255, 0.95)',
    borderColor: isDarkMode
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(139, 157, 195, 0.12)',
    shadowColor: isDarkMode ? '#000000' : '#000000',
    shadowOpacity: isDarkMode ? 0.25 : 0.15,
  };

  return <View style={[styles.card, cardStyle, style]}>{children}</View>;
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.cardContent, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Will be overridden by theme
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)', // Will be overridden by theme
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8, // Stronger elevation for better dark mode visibility
  },
  cardContent: {
    padding: 28,
  },
});
