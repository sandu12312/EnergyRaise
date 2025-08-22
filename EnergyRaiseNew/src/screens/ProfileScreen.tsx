import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SvgIcon } from '../components/ui/SvgIcon';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/Card';

interface ProfileScreenProps {
  navigation?: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { theme, colors, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Format user data from Firebase Auth
  const userEmail = user?.email || 'Utilizator';
  const userName = userEmail.split('@')[0] || 'Utilizator';
  const userInitials = userName.substring(0, 2).toUpperCase();

  // Format creation date
  const creationTime = user?.metadata?.creationTime;
  const memberSince = creationTime
    ? new Date(creationTime).toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Membru nou';

  // User data
  const userData = {
    name: userName,
    email: userEmail,
    memberSince: memberSince,
    stats: {
      consecutiveDays: 7, // These would come from Firestore in a real app
      totalSessions: 45,
    },
    initials: userInitials,
  };

  // Toggle states - sync with actual theme
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(isDarkMode);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoTrackingEnabled, setAutoTrackingEnabled] = React.useState(false);

  // Keep dark mode switch in sync with theme
  React.useEffect(() => {
    setDarkModeEnabled(isDarkMode);
  }, [isDarkMode]);

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleUpgradePremium = () => {
    Alert.alert(
      'Premium',
      'Upgrade la versiunea premium pentru funcții avansate.',
    );
  };

  const handleViewStatistics = () => {
    Alert.alert('Statistici', 'Vizualizare statistici personale.');
  };

  const handleSavedRemedies = () => {
    Alert.alert('Remedii salvate', 'Vizualizare remedii favorite.');
  };

  const handleAccountSettings = () => {
    Alert.alert('Setări cont', 'Editare informații personale.');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Politica de confidențialitate',
      'Informații despre modul în care folosim datele tale.',
    );
  };

  const handleSupport = () => {
    Alert.alert('Suport', 'Contactează echipa noastră pentru asistență.');
  };

  const handleLogout = () => {
    Alert.alert('Deconectare', 'Ești sigur că vrei să te deconectezi?', [
      {
        text: 'Anulează',
        style: 'cancel',
      },
      {
        text: 'Deconectează-te',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoggingOut(true);
            await authService.logout();
            // No need to show alert as the app will automatically navigate to login screen
          } catch (error) {
            Alert.alert(
              'Eroare',
              'A apărut o eroare la deconectare. Încearcă din nou.',
            );
            console.error('Logout error:', error);
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle: string,
    rightElement?: React.ReactNode,
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={[
          styles.settingItem,
          {
            borderBottomColor: isDarkMode
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={styles.settingIconContainer}>
          <SvgIcon name={icon} size={24} color={colors.textMuted} />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>
          <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.settingAction}>{rightElement}</View>
      </TouchableOpacity>
    );
  };

  const renderPremiumBadge = () => (
    <View
      style={[
        styles.premiumBadge,
        {
          backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6',
        },
      ]}
    >
      <Text style={[styles.premiumText, { color: colors.textPrimary }]}>
        Premium
      </Text>
    </View>
  );

  const renderNewBadge = () => (
    <View
      style={[
        styles.newBadge,
        {
          backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6',
        },
      ]}
    >
      <Text style={[styles.newText, { color: colors.textPrimary }]}>Nou</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <SvgIcon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Profil
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <CardContent>
            <View style={styles.profileHeader}>
              <View
                style={[
                  styles.avatarContainer,
                  {
                    backgroundColor: isDarkMode
                      ? 'rgba(163, 201, 168, 0.5)'
                      : 'rgba(163, 201, 168, 0.3)',
                  },
                ]}
              >
                <Text
                  style={[styles.avatarText, { color: colors.textPrimary }]}
                >
                  {userData.initials}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.userName, { color: colors.textPrimary }]}>
                  {userData.name}
                </Text>
                <Text style={[styles.userEmail, { color: colors.textMuted }]}>
                  {userData.email}
                </Text>
                <View style={styles.memberSinceContainer}>
                  <SvgIcon name="calendar" size={16} color={colors.textMuted} />
                  <Text
                    style={[styles.memberSince, { color: colors.textMuted }]}
                  >
                    Membru din {userData.memberSince}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {userData.stats.consecutiveDays}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  zile consecutive
                </Text>
              </View>
              <View
                style={[
                  styles.statDivider,
                  {
                    backgroundColor: isDarkMode
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.05)',
                  },
                ]}
              />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {userData.stats.totalSessions}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  sesiuni totale
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* App Settings Section */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          Setări aplicație
        </Text>
        <Card style={styles.settingsCard}>
          <CardContent style={styles.settingsCardContent}>
            {renderSettingItem(
              'moon',
              'Temă întunecată',
              'Schimbă aspectul aplicației',
              <Switch
                value={darkModeEnabled}
                onValueChange={value => {
                  setDarkModeEnabled(value);
                  toggleTheme();
                }}
                trackColor={{
                  false: isDarkMode ? '#4B5563' : '#E5E7EB',
                  true: '#A3C9A8',
                }}
                thumbColor={darkModeEnabled ? '#FFFFFF' : '#F9FAFB'}
                ios_backgroundColor={isDarkMode ? '#4B5563' : '#E5E7EB'}
              />,
            )}
            {renderSettingItem(
              'bell',
              'Notificări',
              'Primește mementouri zilnice',
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: isDarkMode ? '#4B5563' : '#E5E7EB',
                  true: '#A3C9A8',
                }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#F9FAFB'}
                ios_backgroundColor={isDarkMode ? '#4B5563' : '#E5E7EB'}
              />,
            )}
            {renderSettingItem(
              'leaf',
              'Auto-tracking',
              'Detectare automată emoții',
              <>
                {renderPremiumBadge()}
                <Switch
                  value={autoTrackingEnabled}
                  onValueChange={setAutoTrackingEnabled}
                  trackColor={{
                    false: isDarkMode ? '#4B5563' : '#E5E7EB',
                    true: '#A3C9A8',
                  }}
                  thumbColor={autoTrackingEnabled ? '#FFFFFF' : '#F9FAFB'}
                  ios_backgroundColor={isDarkMode ? '#4B5563' : '#E5E7EB'}
                  disabled={true}
                />
              </>,
            )}
          </CardContent>
        </Card>

        {/* Account & App Section */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          Cont și aplicație
        </Text>
        <Card style={styles.settingsCard}>
          <CardContent style={styles.settingsCardContent}>
            {renderSettingItem(
              'crown',
              'Upgrade la Premium',
              'Deblochează funcții avansate',
              <>
                {renderNewBadge()}
                <SvgIcon
                  name="chevron-right"
                  size={24}
                  color={colors.textMuted}
                />
              </>,
              handleUpgradePremium,
            )}
            {renderSettingItem(
              'chart-bar',
              'Statistici personale',
              'Progresul tău detaliat',
              <SvgIcon
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />,
              handleViewStatistics,
            )}
            {renderSettingItem(
              'heart',
              'Remedii salvate',
              'Favoritele tale',
              <SvgIcon
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />,
              handleSavedRemedies,
            )}
            {renderSettingItem(
              'settings',
              'Setări cont',
              'Informații personale',
              <SvgIcon
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />,
              handleAccountSettings,
            )}
          </CardContent>
        </Card>

        {/* Privacy & Security Section */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          Confidențialitate & Securitate
        </Text>
        <Card style={styles.settingsCard}>
          <CardContent style={styles.settingsCardContent}>
            {renderSettingItem(
              'lock',
              'Politica de confidențialitate',
              'Cum folosim datele tale',
              <SvgIcon
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />,
              handlePrivacyPolicy,
            )}
            {renderSettingItem(
              'mail',
              'Suport',
              'Contactează echipa noastră',
              <SvgIcon
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />,
              handleSupport,
            )}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: isDarkMode
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(239, 68, 68, 0.05)',
            },
          ]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#EF4444" />
          ) : (
            <>
              <SvgIcon name="log-out" size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Deconectează-te</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  memberSinceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingTop: 16,
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statDivider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
    paddingLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  settingsCard: {
    marginBottom: 24,
  },
  settingsCardContent: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  premiumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  newText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    gap: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});
