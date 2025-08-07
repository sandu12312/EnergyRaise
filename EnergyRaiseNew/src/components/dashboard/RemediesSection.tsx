import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
// SVG icons are handled by SvgIcon component
import { Card, CardContent } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';
import { SvgIcon } from '../ui/SvgIcon';
import type { Remedy } from '../../data/dashboardData';

interface RemediesSectionProps {
  remedies: Remedy[];
  onSeeAll: () => void;
  onRemedyPress: (remedy: Remedy) => void;
}

// Arrow right icon now uses SvgIcon component

const getTypeIconName = (type: string) => {
  switch (type) {
    case 'tea':
      return 'cup'; // Assuming we have a cup icon in SvgIcon
    case 'oil':
      return 'leaf';
    case 'supplement':
      return 'pill'; // Assuming we have a pill icon in SvgIcon
    default:
      return 'leaf';
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
            <SvgIcon
              name={getTypeIconName(remedy.type)}
              size={16}
              color="#10B981"
            />
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
          <SvgIcon name="leaf" size={22} color={colors.accentGreen} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Remedii pentru Tine
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
          <SvgIcon name="arrow-right" size={16} color={colors.primary} />
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
