import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { DailyJournalCard } from '../components/journal/DailyJournalCard';
import { EmotionSelector } from '../components/journal/EmotionSelector';
import { JournalEntryInput } from '../components/journal/JournalEntryInput';
import { RecentEntries } from '../components/journal/RecentEntries';
import { CalendarModal } from '../components/journal/CalendarModal';
import { SvgIcon } from '../components/ui/SvgIcon';
import {
  Emotion,
  JournalEntry,
  journalEntries,
  emotions,
} from '../data/journalData';

type ViewMode = 'main' | 'entry-detail';

interface JournalScreenProps {
  navigation?: any;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  const { theme, colors } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | undefined>(
    emotions[0],
  );
  const [entryText, setEntryText] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(journalEntries);

  const isDarkMode = theme === 'dark';

  // Handle tab bar visibility based on view mode
  useEffect(() => {
    if (navigation) {
      navigation.getParent()?.setOptions({
        tabBarStyle:
          viewMode === 'entry-detail'
            ? { display: 'none' }
            : {
                backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                borderTopColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 65,
              },
      });
    }
  }, [viewMode, isDarkMode, navigation]);

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setViewMode('entry-detail');
  };

  const handleSaveEntry = (text: string) => {
    if (!selectedEmotion) {
      Alert.alert(
        'Selectează o emoție',
        'Te rog să selectezi cum te simți astăzi înainte de a salva.',
        [{ text: 'OK' }],
      );
      return;
    }

    if (!text.trim()) {
      Alert.alert(
        'Scrie ceva',
        'Te rog să scrii despre ziua ta înainte de a salva.',
        [{ text: 'OK' }],
      );
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'short',
      }),
      emotion: selectedEmotion,
      content: text,
      timestamp: new Date(),
    };

    setEntries([newEntry, ...entries]);
    setEntryText('');

    // Enhanced success feedback with haptic feedback (if available)
    Alert.alert(
      '✅ Intrare salvată cu succes!',
      `Emoția "${selectedEmotion.name}" și gândurile tale au fost salvate în jurnal.`,
      [
        {
          text: 'Continuă să scrii',
          onPress: () => {
            // Reset for new entry
            setSelectedEmotion(undefined);
          },
        },
        {
          text: 'Vezi jurnalul',
          onPress: () => setViewMode('main'),
          style: 'default',
        },
      ],
    );
  };

  const handleBackPress = () => {
    setViewMode('main');
    setEntryText('');
  };

  const handleCalendarDateSelect = (date: Date) => {
    // For now, just show an alert with the selected date
    Alert.alert(
      'Data selectată',
      `Ai selectat ${date.toLocaleDateString('ro-RO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
    );
  };

  const handleEntryPress = (entry: JournalEntry) => {
    setSelectedEmotion(entry.emotion);
    setEntryText(entry.content);
    setViewMode('entry-detail');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {viewMode === 'entry-detail' && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <SvgIcon name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.headerCenter}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Jurnalul Meu
        </Text>
      </View>

      <View style={styles.headerRight}>
        {viewMode === 'main' && (
          <>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <SvgIcon name="sun" size={24} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgIcon name="heart" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  const renderMainView = () => (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Daily Journal Card */}
      <DailyJournalCard onPress={() => setShowCalendar(true)} />

      {/* Emotion Selector */}
      <EmotionSelector
        selectedEmotion={selectedEmotion}
        onEmotionSelect={handleEmotionSelect}
      />

      {/* Quick Entry Preview - only show if emotion is selected */}
      {selectedEmotion && (
        <View
          style={[
            styles.quickEntryContainer,
            { backgroundColor: isDarkMode ? '#374151' : '#F8FAFC' },
          ]}
        >
          <Text style={[styles.quickEntryTitle, { color: colors.textPrimary }]}>
            📝 Gata să îți descrip ziua?
          </Text>
          <Text style={[styles.quickEntryPrompt, { color: colors.textMuted }]}>
            Ai selectat că te simți {selectedEmotion.emoji}{' '}
            {selectedEmotion.name.toLowerCase()} astăzi. Apasă aici pentru a
            începe să scrii despre ziua ta.
          </Text>
          <TouchableOpacity
            style={[styles.quickEntryButton, { backgroundColor: '#A3C9A8' }]}
            onPress={() => setViewMode('entry-detail')}
            activeOpacity={0.8}
          >
            <Text style={styles.quickEntryButtonText}>✍️ Începe să scrii</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recent Entries Preview */}
      {entries.length > 0 && (
        <View style={styles.recentEntriesPreview}>
          <View style={styles.recentEntriesHeader}>
            <Text
              style={[styles.recentEntriesTitle, { color: colors.textPrimary }]}
            >
              📚 Intrările tale recente
            </Text>
            <TouchableOpacity onPress={() => setViewMode('entry-detail')}>
              <Text style={[styles.seeAllText, { color: '#A3C9A8' }]}>
                Vezi toate
              </Text>
            </TouchableOpacity>
          </View>

          {/* Show last 2 entries */}
          {entries.slice(0, 2).map(entry => (
            <TouchableOpacity
              key={entry.id}
              style={[
                styles.previewEntryCard,
                {
                  backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                  borderColor: isDarkMode ? '#6B7280' : '#E5E7EB',
                },
              ]}
              onPress={() => {
                setSelectedEmotion(entry.emotion);
                setEntryText(entry.content);
                setViewMode('entry-detail');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.previewEntryHeader}>
                <Text style={styles.previewEntryEmoji}>
                  {entry.emotion.emoji}
                </Text>
                <View style={styles.previewEntryInfo}>
                  <Text
                    style={[
                      styles.previewEntryEmotion,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {entry.emotion.name}
                  </Text>
                  <Text
                    style={[
                      styles.previewEntryDate,
                      { color: colors.textMuted },
                    ]}
                  >
                    {entry.date}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.previewEntryContent,
                  { color: colors.textMuted },
                ]}
                numberOfLines={1}
              >
                {entry.content.length > 60
                  ? `${entry.content.substring(0, 60)}...`
                  : entry.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Empty state when no entries */}
      {entries.length === 0 && !selectedEmotion && (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateEmoji}>✨</Text>
          <Text style={[styles.emptyStateTitle, { color: colors.textPrimary }]}>
            Bun venit în jurnalul tău!
          </Text>
          <Text
            style={[styles.emptyStateSubtitle, { color: colors.textMuted }]}
          >
            Selectează o emoție de mai sus pentru a începe prima ta intrare.
          </Text>
        </View>
      )}
    </ScrollView>
  );

  const renderEntryDetailView = () => (
    <View style={styles.entryDetailContainer}>
      <JournalEntryInput
        initialText={entryText}
        onSave={handleSaveEntry}
        onTextChange={setEntryText}
      />

      <RecentEntries
        entries={entries}
        onEntryPress={handleEntryPress}
        maxEntries={5}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1F2937' : '#F9FAFB'}
      />

      {renderHeader()}

      <View style={styles.content}>
        {viewMode === 'main' ? renderMainView() : renderEntryDetailView()}
      </View>

      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleCalendarDateSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 100, // Extra space for better scrolling experience
  },
  quickEntryContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(163, 201, 168, 0.3)',
  },
  quickEntryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  quickEntryPrompt: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  quickEntryButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickEntryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recentEntriesPreview: {
    marginTop: 24,
  },
  recentEntriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentEntriesTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  previewEntryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  previewEntryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  previewEntryEmoji: {
    fontSize: 24,
  },
  previewEntryInfo: {
    flex: 1,
  },
  previewEntryEmotion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  previewEntryDate: {
    fontSize: 12,
  },
  previewEntryContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  entryDetailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
