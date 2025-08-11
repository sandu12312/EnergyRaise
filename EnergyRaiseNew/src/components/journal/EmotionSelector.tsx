import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Emotion, emotions } from '../../data/journalData';

interface EmotionSelectorProps {
  selectedEmotion?: Emotion;
  onEmotionSelect: (emotion: Emotion) => void;
  onEmojiSelect?: (emoji: string) => void; // New prop for direct emoji insertion
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotion,
  onEmotionSelect,
  onEmojiSelect,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleEmotionPress = (emotion: Emotion) => {
    onEmotionSelect(emotion);

    // If onEmojiSelect is provided, call it with the emoji
    if (onEmojiSelect) {
      onEmojiSelect(emotion.emoji);
    }
  };

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
            borderWidth: 1,
          },
          isSelected && {
            shadowColor: '#A3C9A8',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          },
        ]}
        onPress={() => handleEmotionPress(emotion)}
        activeOpacity={0.7}
      >
        <Text style={styles.emotionEmoji}>{emotion.emoji}</Text>
        <Text
          style={[
            styles.emotionLabel,
            {
              color: isSelected ? '#FFFFFF' : colors.textPrimary,
              fontWeight: isSelected ? '600' : '500',
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
      {/* Minimalist header */}
      <Text style={[styles.headerText, { color: colors.textPrimary }]}>
        Cum te simți azi?
      </Text>

      {/* Simple emotions grid */}
      <View style={styles.emotionsGrid}>
        {emotions.map(renderEmotionButton)}
      </View>

      {/* Selected emotion indicator - simplified */}
      {selectedEmotion && (
        <View
          style={[
            styles.selectedEmotionDisplay,
            {
              backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
              borderColor: '#A3C9A8',
              borderWidth: 1,
            },
          ]}
        >
          <Text style={styles.selectedEmoji}>{selectedEmotion.emoji}</Text>
          <Text style={[styles.selectedLabel, { color: colors.textPrimary }]}>
            {selectedEmotion.name}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  emotionButton: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
  },
  emotionEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  emotionLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  selectedEmotionDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  selectedEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});
