import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Card, CardContent } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';
import type { Remedy } from '../../data/dashboardData';

interface RemediesSectionProps {
  remedies: Remedy[];
  onSeeAll: () => void;
  onRemedyPress: (remedy: Remedy) => void;
}

const LeafIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C18 2 22 6 22 12c0 3-1 6-3 8-1 1-2 2-4 2-3 0-5-2-5-5 0-2 1-4 3-5 1 0 2 0 3 1v-1c0-3-2-5-5-5-2 0-4 1-5 3C5 8 4 6 4 4c0-1 1-2 2-2h6z"
      fill={color}
    />
  </Svg>
);

const ArrowRightIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M12 5l7 7-7 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getTypeIcon = (type: string, size: number = 16) => {
  const color = '#10B981';
  switch (type) {
    case 'tea':
      return '☕';
    case 'oil':
      return '🌿';
    case 'supplement':
      return '💊';
    default:
      return '🌿';
  }
};

const RemedyCard: React.FC<{
  remedy: Remedy;
  onPress: (remedy: Remedy) => void;
}> = ({ remedy, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.remedyCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={() => onPress(remedy)}
      activeOpacity={0.8}
    >
      {/* Remedy Image */}
      <View style={styles.remedyImageContainer}>
        <Image
          source={{ uri: remedy.image }}
          style={styles.remedyImage}
          resizeMode="cover"
        />
      </View>

      {/* Remedy Content */}
      <View style={styles.remedyContent}>
        <Text style={[styles.remedyTitle, { color: colors.textPrimary }]}>
          {remedy.title}
        </Text>
        <Text
          style={[styles.remedyDescription, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {remedy.description}
        </Text>

        {/* Type and Duration */}
        <View style={styles.remedyMeta}>
          <View
            style={[
              styles.typeContainer,
              {
                backgroundColor: colors.logoBackground,
              },
            ]}
          >
            <Text style={styles.typeEmoji}>{getTypeIcon(remedy.type)}</Text>
            <Text style={[styles.typeText, { color: colors.textMuted }]}>
              {remedy.type}
            </Text>
          </View>
          <Text style={[styles.durationText, { color: colors.textMuted }]}>
            {remedy.duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const RemediesSection: React.FC<RemediesSectionProps> = ({
  remedies,
  onSeeAll,
  onRemedyPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <LeafIcon size={20} color={colors.accentGreen} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            🌿 Remedii pentru Tine
          </Text>
        </View>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={onSeeAll}
          activeOpacity={0.8}
        >
          <Text style={[styles.seeAllText, { color: colors.primary }]}>
            Vezi toate
          </Text>
          <ArrowRightIcon size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Remedies List */}
      <View style={styles.remediesList}>
        {remedies.map(remedy => (
          <RemedyCard key={remedy.id} remedy={remedy} onPress={onRemedyPress} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
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
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  remediesList: {
    gap: 12,
  },
  remedyCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  remedyImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  remedyImage: {
    width: '100%',
    height: '100%',
  },
  remedyContent: {
    flex: 1,
    gap: 8,
  },
  remedyTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  remedyDescription: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    lineHeight: 18,
  },
  remedyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeEmoji: {
    fontSize: 14,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});
