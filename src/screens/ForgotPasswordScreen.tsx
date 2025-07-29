import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { useTheme } from '../hooks/useTheme';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Perfect dark mode - exactly matching the provided images
  const themeColors = {
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

    // Very subtle borders like in images
    border: isDarkMode
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(139, 157, 195, 0.15)',
    borderActive: isDarkMode ? '#9cb59c' : '#7c9885',
    borderHover: isDarkMode ? '#b8c9b8' : '#8faa92',

    // Background elements matching images
    iconBackground: isDarkMode
      ? 'rgba(156, 181, 156, 0.1)'
      : 'rgba(124, 152, 133, 0.1)',

    // Theme toggle like in images
    themeToggleBackground: isDarkMode ? '#333333' : 'rgba(255, 255, 255, 0.9)',
    themeToggleBorder: isDarkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(124, 152, 133, 0.15)',

    // Success colors for email sent state
    successBackground: isDarkMode ? '#064e3b' : '#d1fae5',
    successBorder: isDarkMode ? '#059669' : '#10b981',
    successText: isDarkMode ? '#6ee7b7' : '#047857',
  };

  const handleSubmit = () => {
    // Dummy data - any email works
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: themeColors.gradientStart },
        ]}
      >
        {/* Theme Toggle */}
        <TouchableOpacity
          style={[
            styles.themeToggle,
            {
              backgroundColor: themeColors.themeToggleBackground,
              borderColor: themeColors.themeToggleBorder,
            },
          ]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeIcon, { color: themeColors.textMuted }]}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: themeColors.themeToggleBackground,
              borderColor: themeColors.themeToggleBorder,
            },
          ]}
          onPress={onBackToLogin}
        >
          <View style={styles.arrowContainer}>
            <View
              style={[
                styles.arrowLeft,
                {
                  borderRightColor: themeColors.textMuted,
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                },
              ]}
            />
          </View>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.logoContainer,
                { backgroundColor: themeColors.successBackground },
              ]}
            >
              <Text
                style={[styles.logoIcon, { color: themeColors.successText }]}
              >
                ✓
              </Text>
            </View>

            <Text style={[styles.title, { color: themeColors.primary }]}>
              Email trimis!
            </Text>

            <Text style={[styles.subtitle, { color: themeColors.textMuted }]}>
              Verifică-ți inbox-ul pentru instrucțiuni
            </Text>
          </View>

          {/* Success Card */}
          <Card isDarkMode={isDarkMode} style={styles.formCard}>
            <CardContent style={styles.cardContent}>
              <View style={styles.successContainer}>
                <View
                  style={[
                    styles.emailInfoContainer,
                    {
                      backgroundColor: themeColors.successBackground,
                      borderColor: themeColors.successBorder,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.emailIcon,
                      { color: themeColors.successText },
                    ]}
                  >
                    📧
                  </Text>
                  <Text
                    style={[
                      styles.emailInfoText,
                      { color: themeColors.successText },
                    ]}
                  >
                    Am trimis instrucțiunile de resetare la:
                  </Text>
                  <Text
                    style={[
                      styles.emailAddress,
                      { color: themeColors.textPrimary },
                    ]}
                  >
                    {email}
                  </Text>
                </View>

                <View style={styles.instructionsContainer}>
                  <Text
                    style={[
                      styles.instructionText,
                      { color: themeColors.textMuted },
                    ]}
                  >
                    Verifică inbox-ul și folderul spam.
                  </Text>
                  <Text
                    style={[
                      styles.instructionText,
                      { color: themeColors.textMuted },
                    ]}
                  >
                    Link-ul este valabil 24 de ore.
                  </Text>
                </View>

                <Button
                  title="Înapoi la login"
                  onPress={onBackToLogin}
                  isDarkMode={isDarkMode}
                  style={styles.submitButton}
                />

                <TouchableOpacity
                  style={styles.resendLink}
                  onPress={() => setIsSubmitted(false)}
                >
                  <Text
                    style={[styles.resendText, { color: themeColors.primary }]}
                  >
                    Nu ai primit email-ul? Încearcă din nou
                  </Text>
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: themeColors.textMuted }]}>
              🌿 Suportul EmoBalance este aici pentru tine
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.gradientStart }]}
    >
      {/* Theme Toggle */}
      <TouchableOpacity
        style={[
          styles.themeToggle,
          {
            backgroundColor: themeColors.themeToggleBackground,
            borderColor: themeColors.themeToggleBorder,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeIcon, { color: themeColors.textMuted }]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={[
          styles.backButton,
          {
            backgroundColor: themeColors.themeToggleBackground,
            borderColor: themeColors.themeToggleBorder,
          },
        ]}
        onPress={onBackToLogin}
      >
        <View style={styles.arrowContainer}>
          <View
            style={[
              styles.arrowLeft,
              {
                borderRightColor: themeColors.textMuted,
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
              },
            ]}
          />
        </View>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: themeColors.primary + '20' },
            ]}
          >
            <Text style={[styles.logoIcon, { color: themeColors.primary }]}>
              🌿
            </Text>
          </View>

          <Text style={[styles.title, { color: themeColors.primary }]}>
            EmoBalance
          </Text>

          <Text style={[styles.subtitle, { color: themeColors.textMuted }]}>
            Recuperează-ți accesul la cont
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=300&fit=crop',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Forgot Password Form */}
        <Card isDarkMode={isDarkMode} style={styles.formCard}>
          <CardContent style={styles.cardContent}>
            <View style={styles.formHeader}>
              <Text
                style={[styles.formTitle, { color: themeColors.textPrimary }]}
              >
                Ai uitat parola?
              </Text>
              <Text
                style={[styles.formSubtitle, { color: themeColors.textMuted }]}
              >
                Introdu email-ul pentru a primi instrucțiuni de resetare
              </Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text
                style={[styles.label, { color: themeColors.textSecondary }]}
              >
                Adresa de email
              </Text>
              <Input
                placeholder="exemplu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                style={styles.input}
              />
              <Text
                style={[styles.fieldHelp, { color: themeColors.textMuted }]}
              >
                Email-ul asociat contului tău EmoBalance
              </Text>
            </View>

            <Button
              title="Trimite instrucțiuni"
              onPress={handleSubmit}
              isDarkMode={isDarkMode}
              style={styles.submitButton}
            />

            <View style={styles.loginLink}>
              <Text
                style={[styles.loginText, { color: themeColors.textMuted }]}
              >
                Îți amintești parola?{' '}
                <Text
                  style={{ color: themeColors.primary }}
                  onPress={onBackToLogin}
                >
                  Înapoi la login
                </Text>
              </Text>
            </View>

            <View
              style={[
                styles.tipContainer,
                {
                  backgroundColor: isDarkMode ? '#1e3a8a20' : '#dbeafe',
                  borderColor: isDarkMode ? '#3b82f6' : '#60a5fa',
                },
              ]}
            >
              <Text
                style={[
                  styles.tipText,
                  { color: isDarkMode ? '#93c5fd' : '#1e40af' },
                ]}
              >
                💡 Sfat: Verifică și folderul spam după ce trimiți cererea
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.textMuted }]}>
            🌿 Recuperarea contului în siguranță
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 1000,
    flexDirection: 'row', // Ensure perfect centering
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  themeIcon: {
    fontSize: 20,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 10,
    borderStyle: 'solid',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600' as const,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 22,
  },
  heroImageContainer: {
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  formCard: {
    marginBottom: 32,
  },
  cardContent: {
    padding: 24,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.3,
  },
  formSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '500' as const,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  input: {
    marginBottom: 8,
  },
  fieldHelp: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 18,
  },
  submitButton: {
    marginBottom: 24,
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  tipContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  tipText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Success screen specific styles
  successContainer: {
    alignItems: 'center',
    gap: 20,
  },
  emailInfoContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  emailIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emailInfoText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  emailAddress: {
    fontSize: 16,
    fontWeight: '600' as const,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  instructionsContainer: {
    gap: 8,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  resendLink: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});
