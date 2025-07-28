/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { WelcomeQuizScreen } from './src/screens/WelcomeQuizScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

type ScreenType = 'welcome-quiz' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>('welcome-quiz');

  const navigateToScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleWelcomeQuizComplete = () => {
    setCurrentScreen('login');
    console.log('Welcome quiz completed, navigating to login...');
  };

  const handleLogin = () => {
    setCurrentScreen('home');
    console.log('Login successful, navigating to home...');
  };

  // Render current screen
  switch (currentScreen) {
    case 'welcome-quiz':
      return <WelcomeQuizScreen onComplete={handleWelcomeQuizComplete} />;

    case 'login':
      return <LoginScreen onLogin={handleLogin} />;

    case 'home':
      return (
        <SafeAreaView style={styles.homeContainer}>
          <View style={styles.homeContent}>
            <Text style={styles.homeTitle}>🎉 Home Screen</Text>
            <Text style={styles.homeSubtitle}>
              Login successful! Welcome to EmoBalance.
            </Text>
            <Text style={styles.homeNote}>
              This is a placeholder for the Home Screen that will be implemented
              next.
            </Text>
          </View>
        </SafeAreaView>
      );

    default:
      return <WelcomeQuizScreen onComplete={handleWelcomeQuizComplete} />;
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#7c9885',
    textAlign: 'center',
    marginBottom: 16,
  },
  homeSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
  },
  homeNote: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748b',
    textAlign: 'center',
    opacity: 0.7,
  },
});
