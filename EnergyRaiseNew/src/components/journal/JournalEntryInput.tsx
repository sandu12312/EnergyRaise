import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { journalPrompts } from '../../data/journalData';
import { Button } from '../ui/Button';

interface JournalEntryInputProps {
  initialText?: string;
  onSave: (text: string) => void;
  onTextChange?: (text: string) => void;
}

export interface JournalEntryInputRef {
  insertEmoji: (emoji: string) => void;
}

const JournalEntryInput = forwardRef<
  JournalEntryInputRef,
  JournalEntryInputProps
>(({ initialText = '', onSave, onTextChange }, ref) => {
  const { theme, colors } = useTheme();
  const [text, setText] = useState(initialText);
  const isDarkMode = theme === 'dark';
  const inputRef = useRef<TextInput>(null);

  const handleTextChange = (newText: string) => {
    setText(newText);
    onTextChange?.(newText);
  };

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
    }
  };

  // New function to insert emoji at cursor position
  const insertEmoji = (emoji: string) => {
    // Focus the input
    inputRef.current?.focus();
    // Insert emoji at current position
    const newText = text + emoji + ' ';
    setText(newText);
    onTextChange?.(newText);
  };

  // Make this function accessible to parent components
  useImperativeHandle(ref, () => ({
    insertEmoji,
  }));

  return (
    <View style={styles.container}>
      {/* Minimalist input area */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
            borderColor:
              text.length > 0 ? '#A3C9A8' : isDarkMode ? '#6B7280' : '#E5E7EB',
            borderWidth: text.length > 0 ? 2 : 1,
            shadowColor: text.length > 0 ? '#A3C9A8' : 'transparent',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: text.length > 0 ? 0.1 : 0,
            shadowRadius: 4,
            elevation: text.length > 0 ? 2 : 0,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[styles.textInput, { color: colors.textPrimary }]}
          multiline
          value={text}
          onChangeText={handleTextChange}
          placeholder="Cum a fost ziua ta? Ce s-a întâmplat special? Cum te-ai simțit și de ce? Scrie orice îți vine în minte..."
          placeholderTextColor={colors.textMuted}
          textAlignVertical="top"
          maxLength={2000}
        />
      </View>

      {/* Simple character counter */}
      <Text style={[styles.counterText, { color: colors.textMuted }]}>
        {text.length} / 2000 caractere
      </Text>

      {/* Save button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Salvează în Jurnal"
          onPress={handleSave}
          disabled={text.trim().length === 0}
          variant="default"
        />
      </View>
    </View>
  );
});

export default JournalEntryInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 180,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    minHeight: 160,
  },
  counterText: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
