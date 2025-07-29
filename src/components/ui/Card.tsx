import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';

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
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#2a2a2a' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(139, 157, 195, 0.12)',
          shadowColor: isDarkMode ? '#000000' : '#8b9dc3',
          shadowOpacity: isDarkMode ? 0.4 : 0.1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.cardContent, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardContent: {
    padding: 20,
  },
});
