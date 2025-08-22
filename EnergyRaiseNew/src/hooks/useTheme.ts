import { useState, useEffect, useCallback } from 'react';
import { Appearance } from 'react-native';
import { storage, STORAGE_KEYS } from '../utils/storage';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  // Background gradients
  backgroundAuroraDark: string[];
  backgroundAuroraLight: string[];

  // Surface colors - glassmorphism
  surfaceOverlay: string;
  cardBackground: string;
  cardBorder: string;
  cardGlassBg: string;

  // Text colors
  text: string; // Default text color
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Accent colors
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
  backgroundAuroraDark: ['#ffffff', '#f8fafc', '#f1f5f9'],
  backgroundAuroraLight: ['#ffffff', '#f8fafc', '#f1f5f9'],
  // Glassmorphism pentru light mode
  surfaceOverlay: 'rgba(255, 255, 255, 0.95)',
  cardBackground: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(139, 157, 195, 0.12)',
  cardGlassBg: 'rgba(255, 255, 255, 0.75)',

  // Text colors din imagini
  text: '#1a202c', // Default text color
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
  // Background aurora borealis - more subtle
  backgroundAuroraDark: ['#0D1A26', '#132A28', '#1C2F34'],
  backgroundAuroraLight: ['#0D1A26', '#132A28', '#1C2F34'],

  // Glassmorphism pentru dark mode - less intense aurora
  surfaceOverlay: 'rgba(31, 47, 63, 0.95)',
  cardBackground: 'rgba(31, 47, 63, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.05)',
  cardGlassBg: 'rgba(31, 47, 63, 0.75)',

  // Text colors
  text: '#F4F6F7', // Default text color
  textPrimary: '#F4F6F7',
  textSecondary: '#9BA8B0',
  textMuted: '#b0b0b0',

  // Accent colors
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
  // Theme state with default system theme
  const [theme, setThemeState] = useState<Theme>(
    (Appearance.getColorScheme() as Theme) || 'light',
  );
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await storage.getItem<{
          theme: Theme;
          isSystemTheme: boolean;
        }>(STORAGE_KEYS.THEME);

        if (savedTheme) {
          setThemeState(savedTheme.theme);
          setIsSystemTheme(savedTheme.isSystemTheme);
        } else {
          // Default to system theme if no preference saved
          const systemTheme = Appearance.getColorScheme() || 'light';
          setThemeState(systemTheme as Theme);
          setIsSystemTheme(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading theme preference:', error);
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Listen for system theme changes if using system theme
  useEffect(() => {
    if (!isSystemTheme) return;

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme && (colorScheme === 'light' || colorScheme === 'dark')) {
        setThemeState(colorScheme as Theme);
        setUpdateCounter(prev => prev + 1);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isSystemTheme]);

  // Function to toggle theme manually
  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    setIsSystemTheme(false);
    setUpdateCounter(prev => prev + 1);

    // Save theme preference
    await storage.setItem(STORAGE_KEYS.THEME, {
      theme: newTheme,
      isSystemTheme: false,
    });
  }, [theme]);

  // Function to reset to system theme
  const resetToSystemTheme = useCallback(async () => {
    const systemTheme = Appearance.getColorScheme() || 'light';
    setThemeState(systemTheme as Theme);
    setIsSystemTheme(true);
    setUpdateCounter(prev => prev + 1);

    // Save theme preference
    await storage.setItem(STORAGE_KEYS.THEME, {
      theme: systemTheme as Theme,
      isSystemTheme: true,
    });
  }, []);

  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return {
    theme,
    colors,
    isLoading,
    updateCounter,
    toggleTheme,
    resetToSystemTheme,
    isSystemTheme,
  };
};
