/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WelcomeQuizScreen } from './src/screens/WelcomeQuizScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';

type ScreenType = 'welcome' | 'login' | 'register' | 'forgotPassword' | 'home';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Dă timp modulelor native să se inițializeze
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleQuizComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('home');
  };

  const handleRegister = () => {
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

  // Render the current screen
  const renderScreen = () => {
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
        // Placeholder for home screen
        return (
          <View style={styles.homeContainer}>
            {/* Home screen content will go here */}
          </View>
        );
      default:
        return <WelcomeQuizScreen onComplete={handleQuizComplete} />;
    }
  };

  // Arată loading screen până se inițializează modulele native
  if (!isReady) {
    return (
      <GestureHandlerRootView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>EnergyRaise</Text>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      {renderScreen()}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1A26',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#A3C9A8',
    letterSpacing: -0.5,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});

export default App;
