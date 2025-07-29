import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { useTheme } from '../hooks/useTheme';

interface RegisterScreenProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  receiveNewsletter: boolean;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onBackToLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    receiveNewsletter: false,
  });
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
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation with dummy data acceptance
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Eroare', 'Parolele nu se potrivesc!');
      return;
    }

    if (!formData.acceptTerms) {
      Alert.alert('Eroare', 'Trebuie să accepți termenii și condițiile!');
      return;
    }

    // Dummy data - any input works for registration
    onRegister();
  };

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
            Alătură-te comunității pentru echilibru energetic
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&h=300&fit=crop',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Register Form */}
        <Card isDarkMode={isDarkMode} style={styles.formCard}>
          <CardContent style={styles.cardContent}>
            <View style={styles.formHeader}>
              <Text
                style={[styles.formTitle, { color: themeColors.textPrimary }]}
              >
                Creează cont nou
              </Text>
              <Text
                style={[styles.formSubtitle, { color: themeColors.textMuted }]}
              >
                Începe călătoria către echilibrul energetic
              </Text>
            </View>

            {/* Name Fields */}
            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Text
                  style={[styles.label, { color: themeColors.textSecondary }]}
                >
                  Prenume
                </Text>
                <Input
                  placeholder="Prenumele tău"
                  value={formData.firstName}
                  onChangeText={text => handleInputChange('firstName', text)}
                  isDarkMode={isDarkMode}
                  style={styles.input}
                />
              </View>

              <View style={styles.nameField}>
                <Text
                  style={[styles.label, { color: themeColors.textSecondary }]}
                >
                  Nume
                </Text>
                <Input
                  placeholder="Numele tău"
                  value={formData.lastName}
                  onChangeText={text => handleInputChange('lastName', text)}
                  isDarkMode={isDarkMode}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text
                style={[styles.label, { color: themeColors.textSecondary }]}
              >
                Email
              </Text>
              <Input
                placeholder="exemplu@email.com"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <Text
                style={[styles.label, { color: themeColors.textSecondary }]}
              >
                Parolă
              </Text>
              <Input
                placeholder="Minimum 8 caractere"
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
                secureTextEntry={!showPassword}
                rightElement={
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={{ color: themeColors.textMuted }}>
                      {showPassword ? '○○' : '●●'}
                    </Text>
                  </TouchableOpacity>
                }
                isDarkMode={isDarkMode}
                style={styles.input}
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldContainer}>
              <Text
                style={[styles.label, { color: themeColors.textSecondary }]}
              >
                Confirmă parola
              </Text>
              <Input
                placeholder="Repetă parola"
                value={formData.confirmPassword}
                onChangeText={text =>
                  handleInputChange('confirmPassword', text)
                }
                secureTextEntry={!showConfirmPassword}
                rightElement={
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Text style={{ color: themeColors.textMuted }}>
                      {showConfirmPassword ? '○○' : '●●'}
                    </Text>
                  </TouchableOpacity>
                }
                isDarkMode={isDarkMode}
                style={styles.input}
              />
            </View>

            {/* Checkboxes */}
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxRow}>
                <Checkbox
                  checked={formData.acceptTerms}
                  onCheckedChange={checked =>
                    handleInputChange('acceptTerms', checked)
                  }
                  isDarkMode={isDarkMode}
                />
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: themeColors.textMuted },
                  ]}
                >
                  Accept{' '}
                  <Text style={{ color: themeColors.primary }}>
                    termenii și condițiile
                  </Text>{' '}
                  și{' '}
                  <Text style={{ color: themeColors.primary }}>
                    politica de confidențialitate
                  </Text>
                </Text>
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox
                  checked={formData.receiveNewsletter}
                  onCheckedChange={checked =>
                    handleInputChange('receiveNewsletter', checked)
                  }
                  isDarkMode={isDarkMode}
                />
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: themeColors.textMuted },
                  ]}
                >
                  Doresc să primesc newsletter cu sfaturi de wellness
                </Text>
              </View>
            </View>

            <Button
              title="Creează contul"
              onPress={handleSubmit}
              isDarkMode={isDarkMode}
              style={styles.submitButton}
            />

            <View style={styles.loginLink}>
              <Text
                style={[styles.loginText, { color: themeColors.textMuted }]}
              >
                Ai deja cont?{' '}
                <Text
                  style={{ color: themeColors.primary }}
                  onPress={onBackToLogin}
                >
                  Conectează-te aici
                </Text>
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.textMuted }]}>
            🌿 Bine ai venit în comunitatea EmoBalance
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nameField: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500' as const,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  input: {
    marginBottom: 0,
  },
  eyeIcon: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  checkboxContainer: {
    marginBottom: 24,
    gap: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  submitButton: {
    marginBottom: 24,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});
