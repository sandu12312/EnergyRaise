/**
 * Energy Raise App
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { WelcomeQuizScreen } from './src/screens/WelcomeQuizScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { auth } from './src/services/firebase';

type ScreenType = 'welcome' | 'login' | 'register' | 'forgotPassword' | 'home';

// Authenticated App Component
const AuthenticatedApp = () => {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  useEffect(() => {
    // Dă timp modulelor native să se inițializeze
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If user is authenticated and has completed the quiz, go to home screen
    if (user && hasCompletedQuiz) {
      setCurrentScreen('home');
    } else if (user && !hasCompletedQuiz) {
      setCurrentScreen('welcome');
    } else if (!user && hasCompletedQuiz) {
      setCurrentScreen('login');
    }
  }, [user, hasCompletedQuiz]);

  // Navigation handlers
  const handleQuizComplete = () => {
    setHasCompletedQuiz(true);
    if (user) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('login');
    }
  };

  const handleLogin = () => {
    // Navigate directly to HomeScreen via tab navigation
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
        return (
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        );
      default:
        return <WelcomeQuizScreen onComplete={handleQuizComplete} />;
    }
  };

  // Arată loading screen până se inițializează modulele native sau loading auth
  if (!isReady || loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>EnergyRaise</Text>
      </View>
    );
  }

  return renderScreen();
};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
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
});

export default App;
