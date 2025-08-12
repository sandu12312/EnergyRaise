import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import {
  dashboardData,
  type ChecklistItem,
  type Remedy,
} from '../data/dashboardData';

// UI Components
import { ScreenWrapper } from '../components/ui/ScreenWrapper';
import { NotificationBell } from '../components/ui/NotificationBell';

// Dashboard Components
import { CrystalProgressCard } from '../components/dashboard/CrystalProgressCard';
import { EnergyBalanceCard } from '../components/dashboard/EnergyBalanceCard';
import { DailySelfCareChecklist } from '../components/dashboard/DailySelfCareChecklist';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RemediesSection } from '../components/dashboard/RemediesSection';

export const HomeScreen: React.FC = () => {
  const { theme, colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    dashboardData.dailyChecklist,
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Quick Actions Data with enhanced styling
  const quickActions = [
    {
      id: '1',
      title: 'Energy Balance',
      icon: 'chart',
      color: colors.primary,
      gradient:
        theme === 'dark'
          ? [colors.cardBackground, colors.primary]
          : ['#E6F4EA', colors.primary],
      onPress: () => {
        Alert.alert('Energy Balance', 'Navigating to Energy Balance screen...');
      },
    },
    {
      id: '2',
      title: 'Daily Boost',
      icon: 'star',
      color: colors.primaryLight,
      gradient:
        theme === 'dark'
          ? [colors.cardBackground, colors.primaryLight]
          : ['#EAF5E3', colors.primaryLight],
      onPress: () => {
        Alert.alert('Daily Boost', 'Starting your daily boost session...');
      },
    },
  ];

  // Handlers
  const handleChecklistToggle = (itemId: string) => {
    setChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleSeeBenefits = () => {
    Alert.alert(
      'Crystal Benefits',
      'Your crystal benefits and tier rewards will be shown here!',
    );
  };

  const handleSeeEnergyBalance = () => {
    Alert.alert(
      'Energy Balance',
      'Detailed energy balance analytics coming soon!',
    );
  };

  const handleSeeAllRemedies = () => {
    Alert.alert(
      'All Remedies',
      'Complete remedies catalog will be available soon!',
    );
  };

  const handleRemedyPress = (remedy: Remedy) => {
    Alert.alert(
      remedy.title,
      `${remedy.description}\n\nDuration: ${remedy.duration}\nType: ${remedy.type}`,
    );
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Your profile settings will appear here.');
  };

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          theme === 'dark'
            ? colors.backgroundAuroraDark[0]
            : colors.backgroundAuroraLight[0]
        }
      />
      <ScreenWrapper
        title="EnergyRaise"
        subtitle={`${dashboardData.user.greeting}, ${dashboardData.user.name}!`}
        rightIcon={
          <NotificationBell
            hasNotifications={true}
            onPress={() =>
              Alert.alert(
                'Notifications',
                'Your notifications will appear here.',
              )
            }
          />
        }
        showProfileIcon={true}
        onProfilePress={handleProfilePress}
      >
        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        >
          {/* Crystal Progress Card */}
          <View style={styles.cardContainer}>
            <CrystalProgressCard
              data={dashboardData.crystalProgress}
              onSeeBenefits={handleSeeBenefits}
            />
          </View>

          {/* Energy Balance Card */}
          <View style={styles.cardContainer}>
            <EnergyBalanceCard
              data={dashboardData.energyBalance}
              onSeeEnergyBalance={handleSeeEnergyBalance}
            />
          </View>

          {/* Daily Self-Care Checklist */}
          <View style={styles.cardContainer}>
            <DailySelfCareChecklist
              items={checklistItems}
              onItemToggle={handleChecklistToggle}
            />
          </View>

          {/* Quick Actions */}
          <View style={styles.cardContainer}>
            <QuickActions actions={quickActions} />
          </View>

          {/* Remedies Section */}
          <View style={[styles.cardContainer, styles.lastCard]}>
            <RemediesSection
              remedies={dashboardData.remedies}
              onSeeAll={handleSeeAllRemedies}
              onRemedyPress={handleRemedyPress}
            />
          </View>
        </ScrollView>
      </ScreenWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 24,
    // Adding subtle shadow for depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  lastCard: {
    marginBottom: 32,
  },
});
