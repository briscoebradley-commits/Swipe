import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';
import { CreditCard } from '../types';
import PressableScale from './PressableScale';

const CATEGORY_ICONS: Record<string, string> = {
  dining: '🍽',
  groceries: '🛒',
  gas: '⛽',
  travel: '✈️',
  entertainment: '🎬',
  shopping: '📦',
  health: '💊',
  other: '💳',
};

type NearbyOffer = {
  id: string;
  merchantName: string;
  category: string;
  distance: number;
  recommendedCardId: string;
  rewardDescription: string;
  estimatedRewardValue: number;
  activeOffer?: string;
  address: string;
};

type Props = {
  offer: NearbyOffer;
  card: CreditCard | undefined;
};

export default function NearbyOfferCard({ offer, card }: Props) {
  const icon = CATEGORY_ICONS[offer.category] ?? '📍';
  const cardName = card?.name ?? 'Best Card';

  return (
    <PressableScale onPress={() => {}} activeScale={0.98}>
      <View style={styles.card}>
        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{offer.merchantName}</Text>
            <Text style={styles.distance}>{offer.distance} mi</Text>
          </View>
          <Text style={styles.address}>{offer.address}</Text>

          {/* Recommended card pill */}
          <View style={styles.recRow}>
            {card && <View style={[styles.cardDot, { backgroundColor: card.color }]} />}
            <Text style={styles.recText} numberOfLines={1}>
              Use {cardName} — {offer.rewardDescription}
            </Text>
          </View>

          {offer.activeOffer && (
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>{offer.activeOffer}</Text>
            </View>
          )}
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  left: {
    paddingTop: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: Fonts.semibold,
  },
  distance: {
    color: Colors.muted,
    fontSize: 12,
  },
  address: {
    color: Colors.mutedSubtle,
    fontSize: 11,
  },
  recRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  cardDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  recText: {
    flex: 1,
    color: Colors.offWhite,
    fontSize: 12,
    fontWeight: Fonts.medium,
  },
  offerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: 'rgba(201,168,76,0.3)',
    marginTop: 3,
  },
  offerText: {
    color: Colors.swipeGold,
    fontSize: 11,
    fontWeight: Fonts.medium,
  },
});
