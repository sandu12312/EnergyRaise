import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface LoginScreenProps {
  onLogin: () => void;
  onGoToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onGoToRegister,
  onForgotPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    // Dummy login - any input works
    if (email.trim() && password.trim()) {
      onLogin();
    }
  };

  // Perfect dark mode - exactly matching the provided images
  const theme = {
    // Dark background exactly like images - pure dark gray/black
    gradientStart: isDarkMode ? '#1a1a1a' : '#f8fafc',
    gradientMid: isDarkMode ? '#1e1e1e' : '#f1f5f9',
    gradientEnd: isDarkMode ? '#222222' : '#e2e8f0',

    // Cards - dark gray like in images
    cardBackground: isDarkMode ? '#2a2a2a' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDarkMode
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(139, 157, 195, 0.12)',

    // Text colors - pure white like in images
    textPrimary: isDarkMode ? '#ffffff' : '#1a202c',
    textSecondary: isDarkMode ? '#ffffff' : '#4a5568',
    textMuted: isDarkMode ? '#b0b0b0' : '#64748b',

    // Mint green accents exactly like images
    primary: isDarkMode ? '#9cb59c' : '#7c9885',
    primaryDark: isDarkMode ? '#7a9f7a' : '#65785c',
    primaryLight: isDarkMode ? '#b8c9b8' : '#8faa92',

    // Buttons with mint green like images
    buttonBackground: isDarkMode ? '#9cb59c' : '#7c9885',
    buttonHover: isDarkMode ? '#7a9f7a' : '#6d8774',

    // Background elements matching images
    iconBackground: isDarkMode
      ? 'rgba(156, 181, 156, 0.1)'
      : 'rgba(124, 152, 133, 0.1)',

    // Theme toggle like in images
    themeToggleBackground: isDarkMode ? '#333333' : 'rgba(255, 255, 255, 0.9)',
    themeToggleBorder: isDarkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(124, 152, 133, 0.15)',
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.gradientStart }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Aurora gradient background */}
      <View
        style={[
          styles.gradientBackground,
          { backgroundColor: theme.gradientStart },
        ]}
      />

      {/* Minimal Theme Toggle */}
      <TouchableOpacity
        style={[
          styles.themeToggle,
          {
            backgroundColor: theme.themeToggleBackground,
            borderColor: theme.themeToggleBorder,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeIcon, { color: theme.textMuted }]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header - Compact */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.iconBackground },
              ]}
            >
              <Text style={[styles.leafIcon, { color: theme.primary }]}>
                🌿
              </Text>
            </View>

            <Text style={[styles.title, { color: theme.primary }]}>
              EmoBalance
            </Text>

            <Text style={[styles.subtitle, { color: theme.textMuted }]}>
              Găsește-ți echilibrul emoțional prin remedii naturale
            </Text>
          </View>

          {/* Hero Image - Compact */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=300&fit=crop',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          {/* Login Form - Minimal */}
          <Card isDarkMode={isDarkMode}>
            <CardContent>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Bine ai revenit
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
                  Conectează-te la contul tău EmoBalance
                </Text>
              </View>

              {/* Form - Compact */}
              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: theme.textPrimary }]}>
                    Email
                  </Text>
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemplu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    isDarkMode={isDarkMode}
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: theme.textPrimary }]}>
                    Parolă
                  </Text>
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Parola ta"
                    secureTextEntry={!showPassword}
                    isDarkMode={isDarkMode}
                    rightElement={
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                      >
                        <View
                          style={[
                            styles.eyeIconContainer,
                            {
                              backgroundColor: isDarkMode
                                ? 'rgba(156, 181, 156, 0.1)'
                                : 'rgba(124, 152, 133, 0.08)',
                              borderColor: isDarkMode
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(124, 152, 133, 0.15)',
                            },
                          ]}
                        >
                          <Text
                            style={[styles.eyeIcon, { color: theme.primary }]}
                          >
                            {showPassword ? '●●' : '○○'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>

                {/* Login Button - Compact */}
                <Button
                  title="Conectează-te"
                  onPress={handleLogin}
                  style={StyleSheet.flatten([
                    styles.loginButton,
                    { backgroundColor: theme.buttonBackground },
                  ])}
                  //isDarkMode={isDarkMode}
                />
              </View>

              {/* Footer Links - Minimal */}
              <View style={styles.footerLinks}>
                <TouchableOpacity
                  style={styles.link}
                  onPress={onForgotPassword}
                >
                  <Text style={[styles.linkText, { color: theme.primary }]}>
                    Ai uitat parola?
                  </Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                  <Text style={[styles.signupText, { color: theme.textMuted }]}>
                    Nu ai cont?{' '}
                  </Text>
                  <TouchableOpacity onPress={onGoToRegister}>
                    <Text style={[styles.signupLink, { color: theme.primary }]}>
                      Înregistrează-te gratuit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Footer - Minimal */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textMuted }]}>
              🌿 Pentru echilibru și bunăstare naturală
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  themeToggle: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  themeIcon: {
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    maxWidth: 380,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  leafIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '200' : '300',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  heroImageContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '300' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  eyeButton: {
    padding: 2,
  },
  eyeIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  footerLinks: {
    alignItems: 'center',
    gap: 16,
  },
  link: {
    padding: 4,
  },
  linkText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    letterSpacing: -0.05,
    opacity: 0.8,
  },
});
