import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SvgIcon } from './SvgIcon';
import { TouchableOpacity } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
  showProfileIcon?: boolean;
  onProfilePress?: () => void;
  contentContainerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  title,
  subtitle,
  rightIcon,
  showProfileIcon = true,
  onProfilePress,
  contentContainerStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const { theme, colors } = useTheme();

  const bannerBackground =
    theme === 'dark' ? 'rgba(31, 47, 63, 0.95)' : 'rgba(255, 255, 255, 0.95)';

  const bannerBorderColor =
    theme === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(139, 157, 195, 0.15)';

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' },
      ]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Enhanced Banner */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: bannerBackground,
            borderBottomColor: bannerBorderColor,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 8,
            borderBottomWidth: 1,
          },
          headerStyle,
        ]}
      >
        <View style={styles.headerLeft}>
          {title && (
            <Text
              style={[styles.appTitle, { color: colors.primary }, titleStyle]}
            >
              {title}
            </Text>
          )}

          {subtitle && (
            <Text
              style={[
                styles.greeting,
                { color: colors.textMuted },
                subtitleStyle,
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.headerRight}>
          {rightIcon}
          {showProfileIcon && (
            <TouchableOpacity
              onPress={onProfilePress}
              style={styles.profileIcon}
            >
              <SvgIcon name="user" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content Container */}
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    letterSpacing: -0.5,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileIcon: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(163, 201, 168, 0.1)',
  },
  contentContainer: {
    flex: 1,
  },
});
