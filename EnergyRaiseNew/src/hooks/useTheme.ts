import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  // Background gradients - exact din imagini
  backgroundAuroraDark: string[];
  backgroundAuroraLight: string[];

  // Surface colors - glassmorphism
  surfaceOverlay: string;
  cardBackground: string;
  cardBorder: string;
  cardGlassBg: string;

  // Text colors - exact din imagini
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Accent colors - exact din imagini
  accentGreen: string;
  iconEnergy: string;
  primary: string;
  primaryLight: string;

  // Interactive colors
  buttonBackground: string;
  buttonGradientStart: string;
  buttonGradientEnd: string;
  buttonHover: string;
  border: string;
  borderActive: string;

  // Logo background
  logoBackground: string;
  logoBackgroundActive: string;

  // Theme toggle
  themeToggleBackground: string;
  themeToggleBorder: string;

  // Progress colors
  progressBackground: string;
  progressIndicator: string;
}

const lightTheme: ThemeColors = {
  // Background exact ca în imagini - gri foarte deschis
  backgroundAuroraDark: ['#f8fafc', '#f1f5f9', '#e2e8f0'],
  backgroundAuroraLight: ['#f8fafc', '#f1f5f9', '#e2e8f0'],

  // Glassmorphism pentru light mode
  surfaceOverlay: 'rgba(255, 255, 255, 0.95)',
  cardBackground: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(139, 157, 195, 0.12)',
  cardGlassBg: 'rgba(255, 255, 255, 0.75)',

  // Text colors din imagini
  textPrimary: '#1a202c',
  textSecondary: '#4a5568',
  textMuted: '#64748b',

  // Accent colors - exact din specificații
  accentGreen: '#A3C9A8',
  iconEnergy: '#B2E384',
  primary: '#A3C9A8',
  primaryLight: '#B2E384',

  // Button gradients
  buttonBackground: '#A3C9A8',
  buttonGradientStart: '#A3C9A8',
  buttonGradientEnd: '#B2E384',
  buttonHover: '#8fb794',
  border: 'rgba(139, 157, 195, 0.15)',
  borderActive: '#A3C9A8',

  // Logo background
  logoBackground: 'rgba(163, 201, 168, 0.15)',
  logoBackgroundActive: 'rgba(163, 201, 168, 0.25)',

  // Theme toggle
  themeToggleBackground: 'rgba(255, 255, 255, 0.9)',
  themeToggleBorder: 'rgba(163, 201, 168, 0.15)',

  // Progress
  progressBackground: 'rgba(148, 163, 184, 0.15)',
  progressIndicator: '#A3C9A8',
};

const darkTheme: ThemeColors = {
  // Background exact din specificații - aurora gradient
  backgroundAuroraDark: ['#0D1A26', '#132A28', '#1C2F34'],
  backgroundAuroraLight: ['#0D1A26', '#132A28', '#1C2F34'],

  // Glassmorphism pentru dark mode
  surfaceOverlay: '#1F2F3F',
  cardBackground: 'rgba(31, 47, 63, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.05)',
  cardGlassBg: 'rgba(31, 47, 63, 0.75)',

  // Text colors exact din specificații
  textPrimary: '#F4F6F7',
  textSecondary: '#9BA8B0',
  textMuted: '#b0b0b0',

  // Accent colors exact din specificații
  accentGreen: '#A3C9A8',
  iconEnergy: '#B2E384',
  primary: '#A3C9A8',
  primaryLight: '#B2E384',

  // Button gradients
  buttonBackground: '#A3C9A8',
  buttonGradientStart: '#A3C9A8',
  buttonGradientEnd: '#B2E384',
  buttonHover: '#8fb794',
  border: 'rgba(255, 255, 255, 0.08)',
  borderActive: '#A3C9A8',

  // Logo background
  logoBackground: 'rgba(163, 201, 168, 0.15)',
  logoBackgroundActive: 'rgba(163, 201, 168, 0.25)',

  // Theme toggle
  themeToggleBackground: 'rgba(31, 47, 63, 0.9)',
  themeToggleBorder: 'rgba(255, 255, 255, 0.1)',

  // Progress
  progressBackground: 'rgba(255, 255, 255, 0.08)',
  progressIndicator: '#A3C9A8',
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app-theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme as Theme);
      } else {
        // Use system preference
        const systemTheme = Appearance.getColorScheme() || 'light';
        setTheme(systemTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      setTheme('light');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem('app-theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setThemeMode = async (newTheme: Theme) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem('app-theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return {
    theme,
    colors,
    toggleTheme,
    setTheme: setThemeMode,
    isLoading,
  };
};
