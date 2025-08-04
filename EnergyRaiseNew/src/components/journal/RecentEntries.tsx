import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { JournalEntry } from '../../data/journalData';

interface RecentEntriesProps {
  entries: JournalEntry[];
  onEntryPress?: (entry: JournalEntry) => void;
  maxEntries?: number;
}

export const RecentEntries: React.FC<RecentEntriesProps> = ({
  entries,
  onEntryPress,
  maxEntries = 10,
}) => {
  const { theme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  const displayEntries = entries.slice(0, maxEntries);

  const renderEntry = (entry: JournalEntry) => {
    const truncatedContent =
      entry.content.length > 80
        ? `${entry.content.substring(0, 80)}...`
        : entry.content;

    return (
      <TouchableOpacity
        key={entry.id}
        style={[
          styles.entryCard,
          {
            backgroundColor: isDarkMode ? '#4B5563' : '#F9FAFB',
            borderColor: isDarkMode ? '#6B7280' : '#E5E7EB',
          },
        ]}
        onPress={() => onEntryPress?.(entry)}
        activeOpacity={0.7}
      >
        <View style={styles.entryHeader}>
          <View style={styles.emotionContainer}>
            <Text style={styles.emotionEmoji}>{entry.emotion.emoji}</Text>
            <View style={styles.entryInfo}>
              <Text style={[styles.emotionName, { color: colors.textPrimary }]}>
                {entry.emotion.name}
              </Text>
              <Text style={[styles.entryDate, { color: colors.textMuted }]}>
                {entry.date}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={[styles.entryContent, { color: colors.textMuted }]}
          numberOfLines={2}
        >
          {truncatedContent}
        </Text>
      </TouchableOpacity>
    );
  };

  if (displayEntries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📖</Text>
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
          Nicio intrare încă
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
          Primele tale gânduri vor apărea aici
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.textPrimary }]}>
          Intrări Recente
        </Text>
        {entries.length > maxEntries && (
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: '#A3C9A8' }]}>
              Vezi toate
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Entries List */}
      <ScrollView
        style={styles.entriesList}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {displayEntries.map(renderEntry)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  entriesList: {
    flex: 1,
  },
  entryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  entryHeader: {
    marginBottom: 8,
  },
  emotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emotionEmoji: {
    fontSize: 32,
  },
  entryInfo: {
    flex: 1,
  },
  emotionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  entryDate: {
    fontSize: 14,
  },
  entryContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
