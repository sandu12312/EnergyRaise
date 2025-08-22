/**
 * Energy Raise App
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { WelcomeQuizScreen } from './src/screens/WelcomeQuizScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { auth } from './src/services/firebase';
import { quizService } from './src/services/quizService';
import { storage, STORAGE_KEYS } from './src/utils/storage';

type ScreenType = 'welcome' | 'login' | 'register' | 'forgotPassword' | 'home';

// Authenticated App Component
const AuthenticatedApp = () => {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [isCheckingQuiz, setIsCheckingQuiz] = useState(true);

  useEffect(() => {
    // Dă timp modulelor native să se inițializeze
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Check if user has completed the quiz
  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        if (user) {
          // Check if user has completed the quiz
          const completed = await quizService.hasCompletedQuiz(user.uid);
          setHasCompletedQuiz(completed);
        } else {
          // Check if we have a local record of quiz completion
          const localCompleted = await storage.getItem<boolean>(
            STORAGE_KEYS.USER_QUIZ_COMPLETED,
          );
          setHasCompletedQuiz(!!localCompleted);
        }
      } catch (error) {
        console.error('Error checking quiz status:', error);
      } finally {
        setIsCheckingQuiz(false);
      }
    };

    if (isReady && !loading) {
      checkQuizStatus();
    }
  }, [user, isReady, loading]);

  useEffect(() => {
    // If user is authenticated and has completed the quiz, go to home screen
    if (user && hasCompletedQuiz) {
      setCurrentScreen('home');
    } else if (user && !hasCompletedQuiz) {
      setCurrentScreen('welcome');
    } else if (!user && hasCompletedQuiz) {
      setCurrentScreen('login');
    } else if (!user && !hasCompletedQuiz) {
      setCurrentScreen('welcome');
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

  // Arată loading screen până se inițializează modulele native, loading auth, sau verificarea quiz-ului
  if (!isReady || loading || isCheckingQuiz) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>EnergyRaise</Text>
        <ActivityIndicator
          size="large"
          color="#A3C9A8"
          style={{ marginTop: 20 }}
        />
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
