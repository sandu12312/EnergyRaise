import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
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
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    dashboardData.dailyChecklist,
  );

  // Quick Actions Data
  const quickActions = [
    {
      id: '1',
      title: 'Energy Balance',
      icon: 'chart',
      onPress: () => {
        Alert.alert('Energy Balance', 'Navigating to Energy Balance screen...');
      },
    },
    {
      id: '2',
      title: 'Daily Boost',
      icon: 'star',
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
    <ScreenWrapper
      title="EnergyRaise"
      subtitle={`${dashboardData.user.greeting}, ${dashboardData.user.name}!`}
      rightIcon={
        <NotificationBell
          hasNotifications={true}
          onPress={() =>
            Alert.alert('Notifications', 'Your notifications will appear here.')
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
      >
        {/* Crystal Progress Card */}
        <CrystalProgressCard
          data={dashboardData.crystalProgress}
          onSeeBenefits={handleSeeBenefits}
        />

        {/* Energy Balance Card */}
        <EnergyBalanceCard
          data={dashboardData.energyBalance}
          onSeeEnergyBalance={handleSeeEnergyBalance}
        />

        {/* Daily Self-Care Checklist */}
        <DailySelfCareChecklist
          items={checklistItems}
          onItemToggle={handleChecklistToggle}
        />

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Remedies Section */}
        <RemediesSection
          remedies={dashboardData.remedies}
          onSeeAll={handleSeeAllRemedies}
          onRemedyPress={handleRemedyPress}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
