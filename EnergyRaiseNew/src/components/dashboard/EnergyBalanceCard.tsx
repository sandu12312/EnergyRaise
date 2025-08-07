import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useTheme } from '../../hooks/useTheme';
import { SvgIcon } from '../ui/SvgIcon';
import type { EnergyBalance } from '../../data/dashboardData';

interface EnergyBalanceCardProps {
  data: EnergyBalance;
  onSeeEnergyBalance: () => void;
}

const EnergyProgressItem: React.FC<{
  iconName: string;
  label: string;
  percentage: number;
  color: string;
  backgroundColor: string;
}> = ({ iconName, label, percentage, color, backgroundColor }) => {
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
          <SvgIcon name={iconName} size={22} color={color} />
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
          height={10}
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
            <SvgIcon name="zap" size={22} color={colors.accentGreen} />
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Energy Balance
            </Text>
          </View>
          <View style={styles.timerContainer}>
            <SvgIcon name="time-clock" size={18} color={colors.textMuted} />
            <Text style={[styles.timer, { color: colors.textMuted }]}>
              {data.timeUntilReset}
            </Text>
          </View>
        </View>

        {/* Energy Progress Items */}
        <View style={styles.energyList}>
          <EnergyProgressItem
            iconName="heart"
            label="Emoțional"
            percentage={data.emotional}
            color="#EF4444"
            backgroundColor={colors.progressBackground}
          />
          <EnergyProgressItem
            iconName="running-man"
            label="Fizic"
            percentage={data.physical}
            color="#10B981"
            backgroundColor={colors.progressBackground}
          />
          <EnergyProgressItem
            iconName="brain"
            label="Mental"
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
            <SvgIcon name="chart-column" size={20} color={colors.textPrimary} />
            <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>
              Today's Energy Summary
            </Text>
          </View>
          <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
            Ai o energie echilibrată. Mici ajustări pot face diferența.
          </Text>
        </View>

        {/* See Energy Balance Button */}
        <Button
          title="Vezi Energy Balance"
          onPress={onSeeEnergyBalance}
          variant="outline"
          style={styles.energyButton}
          leftIcon={
            <SvgIcon name="chart-bar" size={18} color={colors.primary} />
          }
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    marginTop: 8,
    borderRadius: 12,
    shadowColor: '#A3C9A8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});
