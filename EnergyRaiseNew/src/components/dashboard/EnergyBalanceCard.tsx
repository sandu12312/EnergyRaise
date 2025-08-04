import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useTheme } from '../../hooks/useTheme';
import type { EnergyBalance } from '../../data/dashboardData';

interface EnergyBalanceCardProps {
  data: EnergyBalance;
  onSeeEnergyBalance: () => void;
}

const EnergyIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 10V3L4 14h7v7l9-11h-7z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      opacity="0.8"
    />
  </Svg>
);

const HeartIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={color}
    />
  </Svg>
);

const RunnerIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13.5 5.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zM9.5 10.5L12 13l2.5-2.5L15 11V8.5L13.5 7H10.5L9 8.5V11l.5-.5z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      opacity="0.8"
    />
    <Path
      d="M17.5 21.5H15l-2.5-2.5V16l2-2 2.5 2.5M6.5 21.5H9l2.5-2.5V16l-2-2L7 16.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BrainIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3C9 3 7 5 7 8c-2 0-4 2-4 4 0 3 2 5 4 6 1 3 4 3 5 3s4 0 5-3c2-1 4-3 4-6 0-2-2-4-4-4 0-3-2-5-5-5z"
      fill={color}
    />
    <Path
      d="M9.5 10.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5-.5.2-.5.5.2.5.5.5zM14.5 10.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5-.5.2-.5.5.2.5.5.5z"
      fill="white"
    />
  </Svg>
);

const EnergyProgressItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  percentage: number;
  color: string;
  backgroundColor: string;
}> = ({ icon, label, percentage, color, backgroundColor }) => {
  const { colors } = useTheme();

  const getIndicatorColor = () => {
    if (percentage >= 70) return '#10B981'; // Green
    if (percentage >= 50) return '#F59E0B'; // Yellow/Orange
    return '#EF4444'; // Red
  };

  return (
    <View style={styles.energyItem}>
      <View style={styles.energyHeader}>
        <View style={styles.energyLabelContainer}>
          {icon}
          <Text style={[styles.energyLabel, { color: colors.textPrimary }]}>
            {label}
          </Text>
        </View>
        <Text style={[styles.energyPercentage, { color: colors.textPrimary }]}>
          {percentage}%
        </Text>
      </View>
      <View style={styles.energyProgressContainer}>
        <ProgressBar
          progress={percentage}
          progressColors={[color]}
          backgroundColor={backgroundColor}
          height={8}
          animated
          showIndicator
        />
        <View
          style={[
            styles.energyIndicator,
            { backgroundColor: getIndicatorColor() },
          ]}
        />
      </View>
    </View>
  );
};

export const EnergyBalanceCard: React.FC<EnergyBalanceCardProps> = ({
  data,
  onSeeEnergyBalance,
}) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.card}>
      <CardContent style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <EnergyIcon size={20} color={colors.accentGreen} />
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Energy Balance
            </Text>
          </View>
          <Text style={[styles.timer, { color: colors.textMuted }]}>
            🕐 {data.timeUntilReset}
          </Text>
        </View>

        {/* Energy Progress Items */}
        <View style={styles.energyList}>
          <EnergyProgressItem
            icon={<HeartIcon size={20} color="#EF4444" />}
            label="💗 Emoțional"
            percentage={data.emotional}
            color="#EF4444"
            backgroundColor={colors.progressBackground}
          />
          <EnergyProgressItem
            icon={<RunnerIcon size={20} color="#10B981" />}
            label="⚡ Fizic"
            percentage={data.physical}
            color="#10B981"
            backgroundColor={colors.progressBackground}
          />
          <EnergyProgressItem
            icon={<BrainIcon size={20} color="#3B82F6" />}
            label="🧠 Mental"
            percentage={data.mental}
            color="#3B82F6"
            backgroundColor={colors.progressBackground}
          />
        </View>

        {/* Energy Summary */}
        <View
          style={[
            styles.summaryContainer,
            {
              backgroundColor: colors.logoBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryIcon}>🎯</Text>
            <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>
              📊 Today's Energy Summary
            </Text>
          </View>
          <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
            🌟 Ai o energie echilibrată. Mici ajustări pot face diferența.
          </Text>
        </View>

        {/* See Energy Balance Button */}
        <Button
          title="🔄 Vezi Energy Balance"
          onPress={onSeeEnergyBalance}
          variant="ghost"
          style={styles.energyButton}
        />
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  content: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  timer: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  energyList: {
    gap: 16,
  },
  energyItem: {
    gap: 8,
  },
  energyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  energyLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  energyLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  energyPercentage: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  energyProgressContainer: {
    position: 'relative',
  },
  energyIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryIcon: {
    fontSize: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 20,
  },
  energyButton: {
    marginTop: 4,
  },
});
