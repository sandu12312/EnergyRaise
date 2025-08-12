import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useTheme } from '../../hooks/useTheme';
import type { CrystalProgress } from '../../data/dashboardData';

interface CrystalProgressCardProps {
  data: CrystalProgress;
  onSeeBenefits: () => void;
}

const DiamondIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill={color}
    />
    <Polygon
      points="12 6 14 10 18 10.5 15 13.5 15.8 17.5 12 15.5 8.2 17.5 9 13.5 6 10.5 10 10 12 6"
      fill="white"
      opacity="0.4"
    />
  </Svg>
);

const TierBadge: React.FC<{ tier: string; colors: any }> = ({
  tier,
  colors,
}) => (
  <View
    style={[
      styles.tierBadge,
      {
        backgroundColor: colors.logoBackgroundActive,
        borderColor: colors.borderActive,
        shadowColor: colors.accentGreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      },
    ]}
  >
    <DiamondIcon size={14} color={colors.accentGreen} />
    <Text
      style={[
        styles.tierText,
        { color: colors.textSecondary, fontWeight: '600' },
      ]}
    >
      {tier}
    </Text>
  </View>
);

export const CrystalProgressCard: React.FC<CrystalProgressCardProps> = ({
  data,
  onSeeBenefits,
}) => {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const progressPercentage = (data.current / data.total) * 100;

  return (
    <Card
      style={[
        styles.card,
        {
          shadowColor: colors.accentGreen,
          shadowOpacity: isDark ? 0.15 : 0.1,
        },
      ]}
    >
      <CardContent style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <DiamondIcon size={26} color={colors.accentGreen} />
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Energy Crystals
            </Text>
          </View>
          <TierBadge tier={data.tier} colors={colors} />
        </View>

        {/* Crystal count */}
        <View style={styles.crystalCountContainer}>
          <Text style={[styles.crystalCount, { color: colors.textPrimary }]}>
            {data.current}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <ProgressBar
            progress={progressPercentage}
            progressColors={[colors.accentGreen, colors.primaryLight]}
            backgroundColor={colors.progressBackground}
            height={14}
            animated
            showIndicator
          />
          <View style={styles.progressInfoContainer}>
            <Text style={[styles.progressText, { color: colors.textMuted }]}>
              <Text style={{ fontWeight: '600', color: colors.textSecondary }}>
                {data.current}
              </Text>{' '}
              / {data.total} pentru {data.nextTier}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {data.description}
          </Text>
        </View>

        {/* Benefits Button */}
        <Button
          title="Vezi Beneficiile"
          onPress={onSeeBenefits}
          variant="solid"
          style={[
            styles.benefitsButton,
            {
              backgroundColor: colors.accentGreen,
            },
          ]}
          leftIcon={<DiamondIcon size={16} color="white" />}
          accessibilityLabel="Vezi beneficiile oferite de cristale"
        />
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    gap: 20,
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  tierText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  crystalCountContainer: {
    alignItems: 'center',
    marginTop: -8,
    marginBottom: 4,
  },
  crystalCount: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    letterSpacing: 0.5,
  },
  progressSection: {
    gap: 10,
  },
  progressInfoContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 20,
    textAlign: 'center',
  },
  benefitsButton: {
    marginTop: 4,
    borderRadius: 24,
    paddingVertical: 14,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
