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
  Alert,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { useTheme } from '../hooks/useTheme';
import { authService } from '../services/authService';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, colors } = useTheme();

  // Simplified color scheme using theme colors
  const backgroundColors = {
    screen: theme === 'dark' ? '#1F2937' : '#F9FAFB',
    success: theme === 'dark' ? '#064e3b' : '#d1fae5',
    successBorder: theme === 'dark' ? '#059669' : '#10b981',
    successText: theme === 'dark' ? '#6ee7b7' : '#047857',
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Eroare', 'Te rugăm să introduci adresa de email');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(email);
      setIsSubmitted(true);
    } catch (error: any) {
      Alert.alert('Eroare', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: backgroundColors.screen }]}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBackToLogin}>
          <View style={styles.arrowContainer}>
            <View
              style={[
                styles.arrowLeft,
                {
                  borderRightColor: colors.textMuted,
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
                { backgroundColor: backgroundColors.success },
              ]}
            >
              <Text
                style={[
                  styles.logoIcon,
                  { color: backgroundColors.successText },
                ]}
              >
                ✓
              </Text>
            </View>

            <Text style={[styles.title, { color: colors.primary }]}>
              Email trimis!
            </Text>

            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Verifică-ți inbox-ul pentru instrucțiuni
            </Text>
          </View>

          {/* Success Card */}
          <Card style={styles.formCard}>
            <CardContent style={styles.cardContent}>
              <View style={styles.successContainer}>
                <View
                  style={[
                    styles.emailInfoContainer,
                    {
                      backgroundColor: backgroundColors.success,
                      borderColor: backgroundColors.successBorder,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.emailIcon,
                      { color: backgroundColors.successText },
                    ]}
                  >
                    📧
                  </Text>
                  <Text
                    style={[
                      styles.emailInfoText,
                      { color: backgroundColors.successText },
                    ]}
                  >
                    Am trimis instrucțiunile de resetare la:
                  </Text>
                  <Text
                    style={[styles.emailAddress, { color: colors.textPrimary }]}
                  >
                    {email}
                  </Text>
                </View>

                <View style={styles.instructionsContainer}>
                  <Text
                    style={[
                      styles.instructionText,
                      { color: colors.textMuted },
                    ]}
                  >
                    Verifică inbox-ul și folderul spam.
                  </Text>
                  <Text
                    style={[
                      styles.instructionText,
                      { color: colors.textMuted },
                    ]}
                  >
                    Link-ul este valabil 24 de ore.
                  </Text>
                </View>

                <Button
                  title="Înapoi la login"
                  onPress={onBackToLogin}
                  style={styles.submitButton}
                />

                <TouchableOpacity
                  style={styles.resendLink}
                  onPress={() => setIsSubmitted(false)}
                >
                  <Text style={[styles.resendText, { color: colors.primary }]}>
                    Nu ai primit email-ul? Încearcă din nou
                  </Text>
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
              🌿 Suportul EmoBalance este aici pentru tine
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColors.screen }]}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBackToLogin}>
        <View style={styles.arrowContainer}>
          <View
            style={[
              styles.arrowLeft,
              {
                borderRightColor: colors.textMuted,
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
              { backgroundColor: colors.logoBackground },
            ]}
          >
            <Text style={[styles.logoIcon, { color: colors.primary }]}>🌿</Text>
          </View>

          <Text style={[styles.title, { color: colors.primary }]}>
            EmoBalance
          </Text>

          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
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
        <Card style={styles.formCard}>
          <CardContent style={styles.cardContent}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: colors.textPrimary }]}>
                Ai uitat parola?
              </Text>
              <Text style={[styles.formSubtitle, { color: colors.textMuted }]}>
                Introdu email-ul pentru a primi instrucțiuni de resetare
              </Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Adresa de email
              </Text>
              <Input
                placeholder="exemplu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={theme === 'dark'}
                style={styles.input}
              />
              <Text style={[styles.fieldHelp, { color: colors.textMuted }]}>
                Email-ul asociat contului tău EmoBalance
              </Text>
            </View>

            <Button
              title={loading ? 'Se procesează...' : 'Trimite instrucțiuni'}
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={loading}
            />

            <View style={styles.loginLink}>
              <Text style={[styles.loginText, { color: colors.textMuted }]}>
                Îți amintești parola?{' '}
                <Text style={{ color: colors.primary }} onPress={onBackToLogin}>
                  Înapoi la login
                </Text>
              </Text>
            </View>

            <View
              style={[
                styles.tipContainer,
                {
                  backgroundColor: theme === 'dark' ? '#1e3a8a20' : '#dbeafe',
                  borderColor: theme === 'dark' ? '#3b82f6' : '#60a5fa',
                },
              ]}
            >
              <Text
                style={[
                  styles.tipText,
                  { color: theme === 'dark' ? '#93c5fd' : '#1e40af' },
                ]}
              >
                💡 Sfat: Verifică și folderul spam după ce trimiți cererea
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
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

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
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
