import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import { Card, CardContent } from '../ui/Card';
import { Checkbox } from '../ui/Checkbox';
import { useTheme } from '../../hooks/useTheme';
import type { ChecklistItem } from '../../data/dashboardData';

interface DailySelfCareChecklistProps {
  items: ChecklistItem[];
  onItemToggle: (itemId: string) => void;
}

const BulbIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 21h6M12 3a6 6 0 0 1 6 6c0 1-1 2-1 3v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2c0-1-1-2-1-3a6 6 0 0 1 6-6z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      opacity="0.2"
    />
  </Svg>
);

const DiamondIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill={color}
    />
  </Svg>
);

const CheckIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChecklistItemComponent: React.FC<{
  item: ChecklistItem;
  onToggle: (itemId: string) => void;
}> = ({ item, onToggle }) => {
  const { theme, colors } = useTheme();

  return (
    <View style={styles.checklistItem}>
      <View style={styles.checklistLeft}>
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle(item.id)}
          isDarkMode={theme === 'dark'}
        />
        <Text
          style={[
            styles.checklistText,
            {
              color: item.completed ? colors.textMuted : colors.textPrimary,
              textDecorationLine: item.completed ? 'line-through' : 'none',
            },
          ]}
        >
          {item.text}
        </Text>
      </View>
      {item.completed && (
        <View style={styles.rewardContainer}>
          <CheckIcon size={16} color={colors.accentGreen} />
          <DiamondIcon size={12} color={colors.accentGreen} />
          <Text style={[styles.rewardText, { color: colors.accentGreen }]}>
            +{item.reward} cristal
          </Text>
        </View>
      )}
    </View>
  );
};

export const DailySelfCareChecklist: React.FC<DailySelfCareChecklistProps> = ({
  items,
  onItemToggle,
}) => {
  const { colors } = useTheme();
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <Card style={styles.card}>
      <CardContent style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <CheckIcon size={20} color={colors.accentGreen} />
            <BulbIcon size={20} color={colors.primaryLight} />
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Daily Self-Care Checklist
            </Text>
          </View>
          <Text style={[styles.counter, { color: colors.textMuted }]}>
            {completedCount}/{totalCount}
          </Text>
        </View>

        {/* Checklist Items */}
        <View style={styles.checklistContainer}>
          {items.map(item => (
            <ChecklistItemComponent
              key={item.id}
              item={item}
              onToggle={onItemToggle}
            />
          ))}
        </View>
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
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  counter: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  checklistContainer: {
    gap: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checklistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  checklistText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    flex: 1,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(163, 201, 168, 0.1)',
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});
