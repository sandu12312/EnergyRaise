import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import {
  dashboardData,
  type ChecklistItem,
  type Remedy,
} from '../data/dashboardData';

// Dashboard Components
import { CrystalProgressCard } from '../components/dashboard/CrystalProgressCard';
import { EnergyBalanceCard } from '../components/dashboard/EnergyBalanceCard';
import { DailySelfCareChecklist } from '../components/dashboard/DailySelfCareChecklist';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RemediesSection } from '../components/dashboard/RemediesSection';

const UserIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SunIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path d="M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z" fill={color} />
  </Svg>
);

const MoonIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={color} />
  </Svg>
);

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

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' },
      ]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
            borderBottomColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.appTitle, { color: colors.primary }]}>
            EnergyRaise
          </Text>
          <Text style={[styles.greeting, { color: colors.textMuted }]}>
            {dashboardData.user.greeting}, {dashboardData.user.name}!
          </Text>
        </View>
        <View style={styles.headerRight}>
          {theme === 'dark' ? (
            <MoonIcon size={24} color={colors.textMuted} />
          ) : (
            <SunIcon size={24} color={colors.textMuted} />
          )}
          <UserIcon size={24} color={colors.textMuted} />
        </View>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    letterSpacing: -0.5,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
