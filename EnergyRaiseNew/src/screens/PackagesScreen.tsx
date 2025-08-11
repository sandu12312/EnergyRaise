import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Pressable,
  Modal,
  Animated,
  Easing,
  useWindowDimensions,
  AccessibilityInfo,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import type { ThemeColors } from '../hooks/useTheme';
import {
  premiumPackages,
  packageDetails,
  PremiumPackage,
} from '../data/packagesData';

// Extending ThemeColors to include text property
declare module '../hooks/useTheme' {
  interface ThemeColors {
    text: string;
  }
}

// Custom colors for better contrast
const customColors = {
  darkText: '#F0F4F9', // Light color for dark mode
  lightText: '#1A2235', // Dark color for light mode
  darkMutedText: '#CBD5E1', // Light muted color for dark mode
  lightMutedText: '#64748B', // Dark muted color for light mode
  accentGreenLight: '#A3C9A8',
  accentGreenDark: '#22C55E',
  bgDark: '#0F172A',
  bgLight: '#F8FAFC',
  cardDark: '#1F2A3E',
  cardLight: '#FFFFFF',
};

// Package filter categories
const filterCategories = [
  'Toate',
  'Journaling',
  'Meditație',
  'Reflexie',
  'Transformare',
];

export const PackagesScreen: React.FC = () => {
  const { theme, colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const [selectedFilter, setSelectedFilter] = useState('Toate');
  const [selectedPackage, setSelectedPackage] = useState<PremiumPackage | null>(
    null,
  );
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Animation values
  const modalAnimation = useMemo(() => new Animated.Value(0), []);
  const scrollY = useMemo(() => new Animated.Value(0), []);

  // Function to filter packages
  const getFilteredPackages = () => {
    if (selectedFilter === 'Toate') {
      return premiumPackages;
    }

    const filterMap = {
      Journaling: 'Journaling',
      Meditație: 'Meditation',
      Reflexie: 'Reflection',
      Transformare: 'Transformation',
    };

    return premiumPackages.filter(
      pkg => pkg.type === filterMap[selectedFilter as keyof typeof filterMap],
    );
  };

  // Function to handle package selection and show details with animation
  const handlePackageSelect = useCallback(
    (pkg: PremiumPackage) => {
      setSelectedPackage(pkg);
      setDetailModalVisible(true);
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Announce to screen readers
      AccessibilityInfo.isScreenReaderEnabled().then(screenReaderEnabled => {
        if (screenReaderEnabled) {
          AccessibilityInfo.announceForAccessibility(
            `Vizualizare detalii pentru ${pkg.title}`,
          );
        }
      });
    },
    [modalAnimation],
  );

  // Handle modal close with animation
  const handleCloseModal = useCallback(() => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setDetailModalVisible(false);
      setSelectedPackage(null);
    });
  }, [modalAnimation]);

  // Icon components
  const BackIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const ThemeToggle = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
        fill={theme === 'dark' ? colors.text : 'none'}
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const FilterIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4C21 4.55228 20.5523 5 20 5H4C3.44772 5 3 4.55228 3 4Z"
        fill={colors.text}
      />
      <Path
        d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        fill={colors.text}
      />
      <Path
        d="M10 20C10 19.4477 10.4477 19 11 19H13C13.5523 19 14 19.4477 14 20C14 20.5523 13.5523 21 13 21H11C10.4477 21 10 20.5523 10 20Z"
        fill={colors.text}
      />
    </Svg>
  );

  // Package Card Component - Memoized for performance
  const PackageCard = React.memo(
    ({ pkg, index }: { pkg: PremiumPackage; index: number }) => {
      // Create card animation based on scroll position and index
      const animatedScale = scrollY.interpolate({
        inputRange: [-100, 0, index * 140, index * 140 + 100],
        outputRange: [1, 1, 1, 0.96],
        extrapolate: 'clamp',
      });

      const animatedOpacity = scrollY.interpolate({
        inputRange: [index * 140 - 40, index * 140],
        outputRange: [1, 0.7],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[
            styles.packageCard,
            {
              backgroundColor: pkg.backgroundColor
                ? pkg.backgroundColor
                : theme === 'dark'
                ? customColors.cardDark
                : customColors.cardLight,
              transform: [{ scale: animatedScale }],
              opacity: animatedOpacity,
              shadowColor: themeColors.accentColor,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 4,
            },
          ]}
          accessible={true}
          accessibilityLabel={`Pachet ${pkg.title}. ${
            pkg.isPopular ? 'Popular. ' : ''
          }${pkg.isNew ? 'Nou. ' : ''}${pkg.description}`}
          accessibilityRole="button"
          accessibilityHint="Apăsați pentru a vedea detalii despre acest pachet"
        >
          <View style={styles.packageHeader}>
            <Text style={[styles.packageIcon, { fontSize: 36 }]}>
              {pkg.icon}
            </Text>

            {pkg.isPopular && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme === 'dark' ? '#4B6E59' : '#B6E6C9' },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: theme === 'dark' ? '#B6E6C9' : '#2D4A3B' },
                  ]}
                >
                  Popular
                </Text>
              </View>
            )}

            {pkg.isNew && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme === 'dark' ? '#3A4A63' : '#CBD5E1' },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: theme === 'dark' ? '#CBD5E1' : '#334155' },
                  ]}
                >
                  Nou
                </Text>
              </View>
            )}
          </View>

          <Text
            style={[styles.packageTitle, { color: themeColors.primaryText }]}
          >
            {pkg.title}
          </Text>
          <Text
            style={[
              styles.packageDescription,
              { color: themeColors.mutedText },
            ]}
          >
            {pkg.description}
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  stroke={colors.accentGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text
                style={[styles.statValue, { color: themeColors.primaryText }]}
              >
                {pkg.stats.exercises}
              </Text>
              <Text
                style={[styles.statLabel, { color: themeColors.mutedText }]}
              >
                exerciții
              </Text>
            </View>

            <View style={styles.statItem}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke={colors.accentGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text
                style={[styles.statValue, { color: themeColors.primaryText }]}
              >
                {pkg.stats.guides}
              </Text>
              <Text
                style={[styles.statLabel, { color: themeColors.mutedText }]}
              >
                ghiduri
              </Text>
            </View>

            <View style={styles.statItem}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  stroke={colors.accentGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text
                style={[styles.statValue, { color: themeColors.primaryText }]}
              >
                {pkg.stats.techniques}
              </Text>
              <Text
                style={[styles.statLabel, { color: themeColors.mutedText }]}
              >
                tehnici
              </Text>
            </View>
          </View>

          <View style={styles.packageFooter}>
            <View style={styles.durationContainer}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke={colors.textMuted}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={[styles.duration, { color: themeColors.mutedText }]}>
                {pkg.duration.value} {pkg.duration.unit}
              </Text>
            </View>

            <View style={styles.typeContainer}>
              {pkg.type === 'Reflection' && (
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    stroke={colors.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
              {pkg.type === 'Transformation' && (
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    stroke={colors.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
              {pkg.type === 'Meditation' && (
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M15.121 15.121L13.414 13.414C12.636 12.636 12.636 11.364 13.414 10.586L15.121 8.879M9.879 9.879L8.172 8.172C7.393 7.393 7.393 6.121 8.172 5.343L9.879 3.636M10.707 21.707L13.414 19C14.193 18.222 15.465 18.222 16.243 19L18.95 21.707M14.828 14.828L16.243 16.243C17.021 17.021 17.021 18.293 16.243 19.071L14.828 20.485M20.485 9.172L19.071 10.586C18.293 11.364 17.021 11.364 16.243 10.586L14.828 9.172"
                    stroke={colors.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
              {pkg.type === 'Journaling' && (
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    stroke={colors.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
              <Text
                style={[styles.packageType, { color: themeColors.mutedText }]}
              >
                {pkg.type === 'Reflection'
                  ? 'Reflection'
                  : pkg.type === 'Transformation'
                  ? 'Transformation'
                  : pkg.type === 'Meditation'
                  ? 'Meditation'
                  : 'Journaling'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.detailsButton,
              {
                backgroundColor:
                  theme === 'dark'
                    ? 'rgba(163, 201, 168, 0.15)'
                    : 'rgba(34, 197, 94, 0.1)',
                borderColor: themeColors.accentColor,
              },
            ]}
            onPress={() => handlePackageSelect(pkg)}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                stroke={themeColors.accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                stroke={themeColors.accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text
              style={[
                styles.detailsButtonText,
                { color: themeColors.primaryText },
              ]}
            >
              Vezi detalii
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
  );

  // Optimized filtered packages calculation with useMemo
  const filteredPackages = useMemo(() => {
    return getFilteredPackages();
  }, [selectedFilter]);

  // Package Details Modal with enhanced animations
  const PackageDetailModal = useCallback(() => {
    if (!selectedPackage) return null;

    const details =
      packageDetails[selectedPackage.title as keyof typeof packageDetails];

    // Modal animations
    const translateY = modalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
      extrapolate: 'clamp',
    });

    const backdropOpacity = modalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    });

    const scale = modalAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.9, 0.95, 1],
      extrapolate: 'clamp',
    });

    return (
      <Modal
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={handleCloseModal}
        animationType="none"
        statusBarTranslucent
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { backgroundColor: `rgba(0,0,0,${backdropOpacity})` },
          ]}
          accessible={true}
          accessibilityViewIsModal={true}
          accessibilityLabel={`Detalii despre ${selectedPackage.title}`}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                backgroundColor:
                  theme === 'dark'
                    ? customColors.cardDark
                    : customColors.cardLight,
                transform: [{ translateY }, { scale }],
                shadowColor: themeColors.accentColor,
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 20,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.packageIcon, { fontSize: 42 }]}>
                {selectedPackage.icon}
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
                accessible={true}
                accessibilityLabel="Închide detalii"
                accessibilityRole="button"
                accessibilityHint="Închide fereastra de detalii a pachetului"
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M6 18L18 6M6 6l12 12"
                    stroke={colors.text}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            <Text
              style={[styles.modalTitle, { color: themeColors.primaryText }]}
            >
              {selectedPackage.title}
            </Text>

            <View style={styles.packageTypeAndDuration}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke={colors.textMuted}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text
                style={[
                  styles.packageType,
                  { color: themeColors.accentColor, fontWeight: '600' },
                ]}
              >
                {selectedPackage.type}
              </Text>

              <View
                style={[
                  styles.durationSeparator,
                  { backgroundColor: themeColors.mutedText },
                ]}
              />

              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke={themeColors.mutedText}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={[styles.duration, { color: themeColors.mutedText }]}>
                {selectedPackage.duration.value} {selectedPackage.duration.unit}
              </Text>
            </View>

            <Text
              style={[styles.sectionTitle, { color: themeColors.primaryText }]}
            >
              Despre acest pachet
            </Text>
            <Text
              style={[styles.sectionText, { color: themeColors.mutedText }]}
            >
              {details?.description || selectedPackage.description}
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                { color: themeColors.primaryText, marginTop: 24 },
              ]}
            >
              Ce include
            </Text>

            {details?.includes && (
              <View style={styles.includesList}>
                {details.includes.map((item, index) => (
                  <View key={index} style={styles.includeItem}>
                    <View
                      style={[
                        styles.bulletPoint,
                        { backgroundColor: themeColors.accentColor },
                      ]}
                    />
                    <Text
                      style={[
                        styles.includeText,
                        { color: themeColors.mutedText },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {details?.preview && (
              <View
                style={[
                  styles.previewSection,
                  { borderLeftColor: themeColors.accentColor },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: themeColors.primaryText },
                  ]}
                >
                  Preview gratuit
                </Text>
                <Text
                  style={[
                    styles.previewTitle,
                    { color: themeColors.primaryText },
                  ]}
                >
                  {details.preview.title}
                </Text>
                <Text
                  style={[
                    styles.previewDescription,
                    { color: themeColors.mutedText },
                  ]}
                >
                  {details.preview.description}
                </Text>
              </View>
            )}

            <View style={styles.crownContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2L8 6 4 2v6l8 4 8-4V2l-4 4-4-4z"
                  fill={themeColors.accentColor}
                  stroke={themeColors.accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
                  stroke={themeColors.accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text
                style={[styles.crownText, { color: themeColors.mutedText }]}
              >
                Acest pachet face parte din abonamentul premium EnergyRaise
              </Text>
            </View>

            {/* Feedback section */}
            <View style={styles.feedbackSection}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: themeColors.primaryText, fontSize: 16 },
                ]}
              >
                Feedback
              </Text>
              <Text
                style={[styles.feedbackText, { color: themeColors.mutedText }]}
              >
                Ajută-ne să îmbunătățim acest pachet prin trimiterea
                feedback-ului tău
              </Text>
              <TouchableOpacity
                style={styles.feedbackButton}
                accessibilityLabel="Trimite feedback"
                accessibilityRole="button"
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    stroke={themeColors.accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text
                  style={[
                    styles.feedbackButtonText,
                    { color: themeColors.accentColor },
                  ]}
                >
                  Trimite feedback
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.purchaseButton,
                {
                  backgroundColor: themeColors.accentColor,
                  shadowColor: themeColors.accentColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                },
              ]}
              onPress={handleCloseModal}
              accessible={true}
              accessibilityLabel="Începe acum"
              accessibilityRole="button"
            >
              <Animated.Text
                style={[
                  styles.purchaseButtonText,
                  { transform: [{ scale: modalAnimation }] },
                ]}
              >
                Începe acum
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }, [
    modalAnimation,
    handleCloseModal,
    selectedPackage,
    height,
    theme,
    colors,
  ]);

  // Get text colors based on theme for better contrast
  const getTextColor = () => {
    return {
      primaryText:
        theme === 'dark' ? customColors.darkText : customColors.lightText,
      mutedText:
        theme === 'dark'
          ? customColors.darkMutedText
          : customColors.lightMutedText,
      background: theme === 'dark' ? customColors.bgDark : customColors.bgLight,
      cardBackground:
        theme === 'dark' ? customColors.cardDark : customColors.cardLight,
      accentColor:
        theme === 'dark'
          ? customColors.accentGreenDark
          : customColors.accentGreenLight,
    };
  };

  const themeColors = getTextColor();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2L8 6 4 2v6l8 4 8-4V2l-4 4-4-4z"
              fill={colors.accentGreen}
              stroke={colors.accentGreen}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
              stroke={colors.accentGreen}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text
            style={[styles.headerTitle, { color: themeColors.primaryText }]}
          >
            Pachete Premium
          </Text>
        </View>

        <TouchableOpacity style={styles.themeButton}>
          <ThemeToggle />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <Text
          style={[styles.descriptionText, { color: themeColors.accentColor }]}
        >
          Jurnalul Liniștii Interioare
        </Text>
        <Text
          style={[styles.mainDescription, { color: themeColors.primaryText }]}
        >
          Descoperă pachete exclusive de dezvoltare personală, create cu grijă
          pentru călătoria ta către echilibrul emoțional și pacea interioară.
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterCategories.map(category => {
            const isSelected = selectedFilter === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  isSelected && {
                    backgroundColor: theme === 'dark' ? '#334155' : '#E2E8F0',
                    shadowColor: colors.accentGreen,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 2,
                  },
                ]}
                onPress={() => setSelectedFilter(category)}
                accessible={true}
                accessibilityState={{ selected: isSelected }}
                accessibilityRole="tab"
                accessibilityHint={`Filtrează pachetele după categoria ${category}`}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: isSelected
                        ? themeColors.accentColor
                        : themeColors.primaryText,
                    },
                    isSelected && { fontWeight: '700' },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.filterIconButton}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.packageCountContainer}>
        <Svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginRight: 6 }}
        >
          <Path
            d="M12 2L8 6 4 2v6l8 4 8-4V2l-4 4-4-4z"
            fill={themeColors.accentColor}
            stroke={themeColors.accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
            stroke={themeColors.accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text
          style={[styles.packageCountText, { color: themeColors.primaryText }]}
        >
          Toate Pachetele
          <Text style={{ fontWeight: '700', color: themeColors.accentColor }}>
            {' '}
            10
          </Text>
        </Text>
      </View>

      <Animated.ScrollView
        style={styles.packagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.packagesContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {filteredPackages.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </Animated.ScrollView>

      <PackageDetailModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    paddingBottom: 12,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  themeButton: {
    padding: 10,
    borderRadius: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  mainDescription: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  filterScroll: {
    paddingRight: 16,
    paddingVertical: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterIconButton: {
    padding: 10,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
  },
  packageCountText: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  packagesContainer: {
    flex: 1,
  },
  packagesContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  packageCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  packageIcon: {
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  packageTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  packageDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 14,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  packageType: {
    fontSize: 14,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 24,
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingTop: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  packageTypeAndDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 6,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  durationSeparator: {
    width: 1.5,
    height: 16,
    backgroundColor: '#64748B',
    marginHorizontal: 10,
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  includesList: {
    marginTop: 12,
    marginBottom: 8,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  includeText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
    letterSpacing: 0.2,
  },
  previewSection: {
    marginTop: 30,
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#A3C9A8',
  },
  previewTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  previewDescription: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  crownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    marginBottom: 20,
    gap: 10,
    padding: 12,
    backgroundColor: 'rgba(150, 150, 150, 0.05)',
    borderRadius: 20,
  },
  crownText: {
    textAlign: 'center',
    fontSize: 14,
    maxWidth: '80%',
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  purchaseButton: {
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  feedbackSection: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: 'rgba(150, 150, 150, 0.08)',
    borderRadius: 16,
    marginBottom: 24,
  },
  feedbackText: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
  },
  feedbackButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  packageCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
