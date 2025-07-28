/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { WelcomeQuizScreen } from './src/screens/WelcomeQuizScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

type Screen = 'welcome' | 'login' | 'register' | 'forgotPassword' | 'home';

export default function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleQuizComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    // Dummy data - any input works for login
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    // Dummy data - any input works for registration
    setCurrentScreen('home');
  };

  const handleGoToRegister = () => {
    setCurrentScreen('register');
  };

  const handleGoToForgotPassword = () => {
    setCurrentScreen('forgotPassword');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const handleGoToWelcome = () => {
    setCurrentScreen('welcome');
  };

  // Simple Home Screen placeholder
  const HomeScreen = () => (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeContent}>
        <Text style={styles.homeTitle}>🌿 Bine ai venit în EnergyRaise!</Text>
        <Text style={styles.homeSubtitle}>
          Aplicația ta pentru echilibru energetic
        </Text>
        <Text style={styles.backLink} onPress={handleGoToWelcome}>
          ← Înapoi la Welcome Quiz
        </Text>
      </View>
    </SafeAreaView>
  );

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeQuizScreen onComplete={handleQuizComplete} />;

    case 'login':
      return (
        <LoginScreen
          onLogin={handleLogin}
          onGoToRegister={handleGoToRegister}
          onForgotPassword={handleGoToForgotPassword}
        />
      );

    case 'register':
      return (
        <RegisterScreen
          onRegister={handleRegister}
          onBackToLogin={handleBackToLogin}
        />
      );

    case 'forgotPassword':
      return <ForgotPasswordScreen onBackToLogin={handleBackToLogin} />;

    case 'home':
      return <HomeScreen />;

    default:
      return <WelcomeQuizScreen onComplete={handleQuizComplete} />;
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: '600' as const,
    color: '#7c9885',
    textAlign: 'center',
    marginBottom: 16,
  },
  homeSubtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 40,
  },
  backLink: {
    fontSize: 16,
    color: '#7c9885',
    textAlign: 'center',
  },
});
