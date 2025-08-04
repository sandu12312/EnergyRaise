import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Emotion, emotions } from '../../data/journalData';

interface EmotionSelectorProps {
  selectedEmotion?: Emotion;
  onEmotionSelect: (emotion: Emotion) => void;
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotion,
  onEmotionSelect,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  const renderEmotionButton = (emotion: Emotion) => {
    const isSelected = selectedEmotion?.id === emotion.id;

    return (
      <TouchableOpacity
        key={emotion.id}
        style={[
          styles.emotionButton,
          {
            backgroundColor: isSelected
              ? '#A3C9A8'
              : isDarkMode
              ? '#4B5563'
              : '#F3F4F6',
            borderColor: isSelected ? '#22C55E' : 'transparent',
            borderWidth: 2,
            transform: [{ scale: isSelected ? 1.05 : 1 }],
          },
          isSelected && {
            shadowColor: '#A3C9A8',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          },
        ]}
        onPress={() => onEmotionSelect(emotion)}
        activeOpacity={0.7}
      >
        <Text style={[styles.emotionEmoji, { fontSize: isSelected ? 28 : 24 }]}>
          {emotion.emoji}
        </Text>
        <Text
          style={[
            styles.emotionLabel,
            {
              color: isSelected ? '#FFFFFF' : colors.textPrimary,
              fontWeight: isSelected ? '700' : '500',
            },
          ]}
        >
          {emotion.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Header with gradient background */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#4B5563' : '#F8FAFC',
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderRadius: 16,
            marginBottom: 20,
          },
        ]}
      >
        <Text style={styles.headerIcon}>✨</Text>
        <Text style={[styles.headerText, { color: colors.textPrimary }]}>
          Cum te simți azi?
        </Text>
        <Text style={[styles.subHeaderText, { color: colors.textMuted }]}>
          Selectează emoția care te descrie cel mai bine
        </Text>
      </View>

      {/* Improved emotions grid with better spacing */}
      <View style={styles.emotionsGrid}>
        {emotions.map(renderEmotionButton)}
      </View>

      {/* Enhanced selected emotion display */}
      {selectedEmotion && (
        <View
          style={[
            styles.selectedEmotionDisplay,
            {
              backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
              borderColor: '#A3C9A8',
              borderWidth: 2,
              shadowColor: '#A3C9A8',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            },
          ]}
        >
          <Text style={styles.selectedEmoji}>{selectedEmotion.emoji}</Text>
          <View style={styles.selectedInfo}>
            <Text style={[styles.selectedLabel, { color: colors.textPrimary }]}>
              {selectedEmotion.name}
            </Text>
            <Text
              style={[styles.selectedDescription, { color: colors.textMuted }]}
            >
              Emoția ta pentru astăzi
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 0,
    gap: 8,
  },
  headerIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  emotionButton: {
    width: '22%', // 4 columns with gaps
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 2,
    marginBottom: 8,
  },
  selectedEmotion: {
    borderWidth: 2,
    borderColor: '#A3C9A8',
  },
  emotionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  emotionLabel: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 14,
  },
  selectedEmotionDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  selectedEmoji: {
    fontSize: 32,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedLabel: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  selectedDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
});
