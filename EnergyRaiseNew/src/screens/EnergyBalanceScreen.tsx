import React, { useState } from 'react';
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
import { SvgIcon } from '../components/ui/SvgIcon';
import { EnergyOverviewCard } from '../components/energy/EnergyOverviewCard';
import { EnergyLevelDisplay } from '../components/energy/EnergyLevelDisplay';
import { EnergyQuizSection } from '../components/energy/EnergyQuizSection';
import { WeeklyTipCard } from '../components/energy/WeeklyTipCard';
import { AffirmationCard } from '../components/energy/AffirmationCard';
import { EnergySummaryCard } from '../components/energy/EnergySummaryCard';
import {
  energyBalanceData,
  energyQuizzes,
  getCurrentDateFormatted,
} from '../data/energyBalanceData';

interface EnergyBalanceScreenProps {
  navigation?: any;
}

export const EnergyBalanceScreen: React.FC<EnergyBalanceScreenProps> = ({
  navigation,
}) => {
  const { theme, colors } = useTheme();
  const [currentData, setCurrentData] = useState(energyBalanceData);
  const isDarkMode = theme === 'dark';

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleQuizPress = (quizId: string) => {
    // For now, show a placeholder message
    Alert.alert(
      'Quiz în dezvoltare',
      'Această funcționalitate va fi disponibilă în curând!',
      [{ text: 'OK' }],
    );
  };

  const handleThemeToggle = () => {
    // This would toggle theme - for now just show info
    Alert.alert(
      'Tema',
      'Tema se schimbă automat în funcție de setările sistemului.',
      [{ text: 'OK' }],
    );
  };

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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <SvgIcon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Energy Balance
        </Text>

        <TouchableOpacity
          onPress={handleThemeToggle}
          style={styles.themeButton}
        >
          <SvgIcon
            name={isDarkMode ? 'sun' : 'moon'}
            size={24}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Energy Overview Card */}
        <EnergyOverviewCard data={currentData} />

        {/* Current Energy Levels */}
        <View
          style={[
            styles.energyLevelsCard,
            {
              backgroundColor: isDarkMode ? '#4B5563' : '#F8FAFC',
              borderColor: isDarkMode ? '#6B7280' : '#E5E7EB',
            },
          ]}
        >
          <View style={styles.energyLevelsHeader}>
            <Text style={styles.energyLevelsIcon}>⚡</Text>
            <Text
              style={[styles.energyLevelsTitle, { color: colors.textPrimary }]}
            >
              Nivelurile Actuale de Energie
            </Text>
          </View>

          {currentData.energyLevels.map((energyLevel, index) => (
            <EnergyLevelDisplay
              key={energyLevel.type}
              energyLevel={energyLevel}
            />
          ))}
        </View>

        {/* Quiz Section */}
        <EnergyQuizSection
          quizzes={energyQuizzes}
          onQuizPress={handleQuizPress}
        />

        {/* Weekly Tip */}
        <WeeklyTipCard tip={currentData.weeklyTip} />

        {/* Affirmation */}
        <AffirmationCard
          initialAffirmation={currentData.affirmation.text}
          category={currentData.affirmation.category}
        />

        {/* Energy Summary */}
        <EnergySummaryCard summary={currentData.summary} />
      </ScrollView>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  themeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 100, // Extra space for better scrolling
  },
  energyLevelsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  energyLevelsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  energyLevelsIcon: {
    fontSize: 20,
  },
  energyLevelsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
