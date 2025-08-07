import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SvgIcon } from '../components/ui/SvgIcon';
import { ScreenWrapper } from '../components/ui/ScreenWrapper';
import { NotificationBell } from '../components/ui/NotificationBell';
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

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Your profile settings will appear here.');
  };

  const backButton = (
    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
      <SvgIcon name="arrow-left" size={24} color={colors.textPrimary} />
    </TouchableOpacity>
  );

  const notificationBell = (
    <NotificationBell
      hasNotifications={false}
      onPress={() =>
        Alert.alert('Notifications', 'Your notifications will appear here.')
      }
    />
  );

  return (
    <ScreenWrapper
      title="Energy Balance"
      rightIcon={notificationBell}
      headerStyle={styles.header}
      titleStyle={styles.headerTitle}
      showProfileIcon={true}
      onProfilePress={handleProfilePress}
    >
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
              backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.8)' : '#FFFFFF',
              borderColor: isDarkMode
                ? 'rgba(75, 85, 99, 0.5)'
                : 'rgba(229, 231, 235, 0.8)',
            },
          ]}
        >
          <View style={styles.energyLevelsHeader}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDarkMode
                    ? 'rgba(163, 201, 168, 0.1)'
                    : 'rgba(163, 201, 168, 0.1)',
                },
              ]}
            >
              <SvgIcon name="zap" size={18} color={colors.accentGreen} />
            </View>
            <Text
              style={[styles.energyLevelsTitle, { color: colors.textPrimary }]}
            >
              Nivelurile Actuale de Energie
            </Text>
          </View>

          {currentData.energyLevels.map(energyLevel => (
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
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
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
    gap: 12,
    marginBottom: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  energyLevelsTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
});
