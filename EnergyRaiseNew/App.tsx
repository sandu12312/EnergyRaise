/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WelcomeQuizScreen } from './src/screens/WelcomeQuizScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';

type ScreenType = 'welcome' | 'login' | 'register' | 'forgotPassword' | 'home';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

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

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});

export default App;
