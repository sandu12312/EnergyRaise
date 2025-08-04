import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export const SoundsScreen: React.FC = () => {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          🎵 Sounds
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Sunetele de vindecare și relaxare vor fi disponibile în curând
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
