import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { journalPrompts } from '../../data/journalData';
import { Button } from '../ui/Button';

interface JournalEntryInputProps {
  initialText?: string;
  onSave: (text: string) => void;
  onTextChange?: (text: string) => void;
}

export const JournalEntryInput: React.FC<JournalEntryInputProps> = ({
  initialText = '',
  onSave,
  onTextChange,
}) => {
  const { theme, colors } = useTheme();
  const [text, setText] = useState(initialText);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDarkMode = theme === 'dark';

  const handleTextChange = (newText: string) => {
    setText(newText);
    onTextChange?.(newText);
  };

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
    }
  };

  const getRandomPrompt = () => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  };

  const placeholderText = text.length === 0 ? getRandomPrompt() : '';

  return (
    <View style={styles.container}>
      {/* Enhanced header */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          📝 Descrie-ți ziua
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Împărtășește-ți gândurile și sentimentele
        </Text>
      </View>

      {/* Enhanced text input with expand/collapse */}
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
            borderColor:
              text.length > 0 ? '#A3C9A8' : isDarkMode ? '#6B7280' : '#E5E7EB',
            borderWidth: text.length > 0 ? 2 : 1,
            minHeight: isExpanded ? 200 : 120,
            shadowColor: text.length > 0 ? '#A3C9A8' : 'transparent',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: text.length > 0 ? 0.1 : 0,
            shadowRadius: 4,
            elevation: text.length > 0 ? 2 : 0,
          },
        ]}
        onPress={() => setIsExpanded(true)}
        activeOpacity={1}
      >
        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.textPrimary,
              fontSize: 16,
              lineHeight: 24,
            },
          ]}
          multiline
          numberOfLines={isExpanded ? 8 : 4}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Începe să scrii despre ziua ta..."
          placeholderTextColor={colors.textMuted}
          textAlignVertical="top"
          maxLength={2000}
          onFocus={() => setIsExpanded(true)}
        />
      </TouchableOpacity>

      {/* Enhanced character counter */}
      <View style={styles.counterContainer}>
        <Text style={[styles.counterText, { color: colors.textMuted }]}>
          {text.length} / 2000 caractere
        </Text>
        {text.length > 1800 && (
          <Text style={[styles.warningText, { color: '#F59E0B' }]}>
            Mai ai {2000 - text.length} caractere
          </Text>
        )}
      </View>

      {/* Enhanced save button */}
      <View style={styles.buttonContainer}>
        <Button
          title={
            text.trim().length > 0
              ? '💾 Salvează în Jurnal'
              : '✍️ Scrie ceva pentru a salva'
          }
          onPress={handleSave}
          disabled={text.trim().length === 0}
          variant="default"
        />

        {/* Character progress indicator */}
        {text.length > 0 && (
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6' },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((text.length / 200) * 100, 100)}%`,
                    backgroundColor:
                      text.length < 50
                        ? '#F59E0B'
                        : text.length < 150
                        ? '#A3C9A8'
                        : '#22C55E',
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textMuted }]}>
              {text.length < 50
                ? 'Continuă să scrii...'
                : text.length < 150
                ? 'Excelent progres!'
                : 'Gânduri minunate! 🌟'}
            </Text>
          </View>
        )}
      </View>

      {/* Writing Tips */}
      {text.length === 0 && (
        <View style={styles.tipsContainer}>
          <Text style={[styles.tipsTitle, { color: colors.textMuted }]}>
            💡 Sugestii pentru scriere:
          </Text>
          <Text style={[styles.tipsText, { color: colors.textMuted }]}>
            • Scrie despre momentele care te-au marcat astăzi{'\n'}• Descrie
            emoțiile pe care le-ai simțit{'\n'}• Menționează pentru ce ești
            recunoscător{'\n'}• Nu-ți face griji pentru gramatică, doar
            exprimă-te liber
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 14,
  },
  warningText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  tipsContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(163, 201, 168, 0.1)',
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
