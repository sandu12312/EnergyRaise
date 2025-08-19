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
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { firestoreService, UserData } from '../services/firestoreService';

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    receiveNewsletter: false,
  });
  const { theme, colors } = useTheme();
  const { setUser } = useAuth();

  // Simplified background colors
  const backgroundColors = {
    screen: theme === 'dark' ? '#1F2937' : '#F9FAFB',
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

  const handleSubmit = async () => {
    // Form validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert('Eroare', 'Te rugăm să completezi numele și prenumele');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Eroare', 'Te rugăm să completezi adresa de email');
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert('Eroare', 'Parola trebuie să conțină cel puțin 8 caractere');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Eroare', 'Parolele nu se potrivesc!');
      return;
    }

    if (!formData.acceptTerms) {
      Alert.alert('Eroare', 'Trebuie să accepți termenii și condițiile!');
      return;
    }

    setLoading(true);
    try {
      // Register the user with Firebase
      const user = await authService.register(
        formData.email,
        formData.password,
      );

      // Store additional user data in Firestore
      if (user && user.uid) {
        const userData: UserData = {
          uid: user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          createdAt: new Date(),
          receiveNewsletter: formData.receiveNewsletter,
        };

        await firestoreService.setUserData(userData);
      }

      Alert.alert(
        'Înregistrare reușită',
        'Contul tău a fost creat. Te rugăm să verifici email-ul pentru a confirma adresa.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Automatically log out the user and go back to login
              authService.logout();
              onBackToLogin();
            },
          },
        ],
      );
    } catch (error: any) {
      Alert.alert('Eroare la înregistrare', error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Card style={styles.formCard}>
          <CardContent style={styles.cardContent}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: colors.textPrimary }]}>
                Creează cont nou
              </Text>
              <Text style={[styles.formSubtitle, { color: colors.textMuted }]}>
                Începe călătoria către echilibrul energetic
              </Text>
            </View>

            {/* Name Fields */}
            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Prenume
                </Text>
                <Input
                  placeholder="Prenumele tău"
                  value={formData.firstName}
                  onChangeText={text => handleInputChange('firstName', text)}
                  isDarkMode={theme === 'dark'}
                  style={styles.input}
                />
              </View>

              <View style={styles.nameField}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Nume
                </Text>
                <Input
                  placeholder="Numele tău"
                  value={formData.lastName}
                  onChangeText={text => handleInputChange('lastName', text)}
                  isDarkMode={theme === 'dark'}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Email
              </Text>
              <Input
                placeholder="exemplu@email.com"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={theme === 'dark'}
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
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
                    <Text style={{ color: colors.textMuted }}>
                      {showPassword ? '○○' : '●●'}
                    </Text>
                  </TouchableOpacity>
                }
                isDarkMode={theme === 'dark'}
                style={styles.input}
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
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
                    <Text style={{ color: colors.textMuted }}>
                      {showConfirmPassword ? '○○' : '●●'}
                    </Text>
                  </TouchableOpacity>
                }
                isDarkMode={theme === 'dark'}
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
                  isDarkMode={theme === 'dark'}
                />
                <Text
                  style={[styles.checkboxLabel, { color: colors.textMuted }]}
                >
                  Accept{' '}
                  <Text style={{ color: colors.primary }}>
                    termenii și condițiile
                  </Text>{' '}
                  și{' '}
                  <Text style={{ color: colors.primary }}>
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
                  isDarkMode={theme === 'dark'}
                />
                <Text
                  style={[styles.checkboxLabel, { color: colors.textMuted }]}
                >
                  Doresc să primesc newsletter cu sfaturi de wellness
                </Text>
              </View>
            </View>

            <Button
              title={loading ? 'Se procesează...' : 'Creează contul'}
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={loading}
            />

            <View style={styles.loginLink}>
              <Text style={[styles.loginText, { color: colors.textMuted }]}>
                Ai deja cont?{' '}
                <Text style={{ color: colors.primary }} onPress={onBackToLogin}>
                  Conectează-te aici
                </Text>
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
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
