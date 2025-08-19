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
  Alert,
} from 'react-native';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTheme } from '../hooks/useTheme';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

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
  const [loading, setLoading] = useState(false);
  const { theme, colors } = useTheme();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const user = await authService.login(email, password);

      if (!user.emailVerified) {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email before signing in. Check your inbox for a verification link.',
          [
            { text: 'OK', style: 'cancel' },
            {
              text: 'Resend Email',
              onPress: async () => {
                try {
                  await authService.resendVerificationEmail();
                  Alert.alert(
                    'Success',
                    'Verification email sent successfully',
                  );
                } catch (error: any) {
                  Alert.alert('Error', error.message);
                }
              },
            },
          ],
        );
        await authService.logout();
      } else {
        setUser(user);
        onLogin();
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simplified background colors
  const backgroundColors = {
    screen: theme === 'dark' ? '#1F2937' : '#F9FAFB',
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColors.screen }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header - Compact */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.logoBackground },
              ]}
            >
              <Text style={[styles.leafIcon, { color: colors.primary }]}>
                🌿
              </Text>
            </View>

            <Text style={[styles.title, { color: colors.primary }]}>
              EmoBalance
            </Text>

            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
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
          <Card>
            <CardContent>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                  Bine ai revenit
                </Text>
                <Text
                  style={[styles.cardSubtitle, { color: colors.textMuted }]}
                >
                  Conectează-te la contul tău EmoBalance
                </Text>
              </View>

              {/* Form - Compact */}
              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.textPrimary }]}>
                    Email
                  </Text>
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemplu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    isDarkMode={theme === 'dark'}
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.textPrimary }]}>
                    Parolă
                  </Text>
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Parola ta"
                    secureTextEntry={!showPassword}
                    isDarkMode={theme === 'dark'}
                    rightElement={
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                      >
                        <View
                          style={[
                            styles.eyeIconContainer,
                            {
                              backgroundColor: colors.logoBackground,
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Text
                            style={[styles.eyeIcon, { color: colors.primary }]}
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
                  title={loading ? 'Se procesează...' : 'Conectează-te'}
                  onPress={handleLogin}
                  style={styles.loginButton}
                  disabled={loading}
                />
              </View>

              {/* Footer Links - Minimal */}
              <View style={styles.footerLinks}>
                <TouchableOpacity
                  style={styles.link}
                  onPress={onForgotPassword}
                >
                  <Text style={[styles.linkText, { color: colors.primary }]}>
                    Ai uitat parola?
                  </Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                  <Text
                    style={[styles.signupText, { color: colors.textMuted }]}
                  >
                    Nu ai cont?{' '}
                  </Text>
                  <TouchableOpacity onPress={onGoToRegister}>
                    <Text
                      style={[styles.signupLink, { color: colors.primary }]}
                    >
                      Înregistrează-te gratuit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Footer - Minimal */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
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
