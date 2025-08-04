import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { JournalScreen } from '../screens/JournalScreen';
import { EnergyBalanceScreen } from '../screens/EnergyBalanceScreen';
import { SoundsScreen } from '../screens/SoundsScreen';

const Tab = createBottomTabNavigator();

// Tab Icons Component
const TabIcon: React.FC<{ name: string; size: number; color: string }> = ({
  name,
  size,
  color,
}) => {
  const icons = {
    home: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0v-6a1 1 0 011-1h2a1 1 0 011 1v6m3 0h3a1 1 0 001-1V10m-3 0l2 2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    journal: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    'energy-balance': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    sounds: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 9a3 3 0 116 0c0 1-1 1-1 4v1a2 2 0 01-4 0v-1c0-3 0-3-1-4z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 21h6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
  };

  return icons[name as keyof typeof icons] || icons.home;
};

export const BottomTabNavigator: React.FC = () => {
  const { theme, colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'JournalTab':
              iconName = 'journal';
              break;
            case 'EnergyBalanceTab':
              iconName = 'energy-balance';
              break;
            case 'SoundsTab':
              iconName = 'sounds';
              break;
            default:
              iconName = 'home';
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TabIcon
                name={iconName}
                size={size}
                color={focused ? colors.accentGreen : colors.textMuted}
              />
            </View>
          );
        },
        tabBarActiveTintColor: colors.accentGreen,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopColor: theme === 'dark' ? '#374151' : '#E5E7EB',
          borderTopWidth: 1,
          paddingTop: 5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 85 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="JournalTab"
        component={JournalScreen}
        options={{
          tabBarLabel: 'Jurnal',
        }}
      />
      <Tab.Screen
        name="EnergyBalanceTab"
        component={EnergyBalanceScreen}
        options={{
          tabBarLabel: 'Energy Balance',
        }}
      />
      <Tab.Screen
        name="SoundsTab"
        component={SoundsScreen}
        options={{
          tabBarLabel: 'Sounds',
        }}
      />
    </Tab.Navigator>
  );
};
