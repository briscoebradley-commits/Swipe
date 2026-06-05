import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CreditCard } from '../types';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';
import { useScreenWidth } from '../utils/useScreenWidth';
import PressableScale from './PressableScale';

export const CONNECTED_CARD_ASPECT = 0.56;

/** Height of a connected card given the current screen width. */
export function useConnectedCardSize() {
  const screenWidth = useScreenWidth();
  const width = screenWidth - Spacing.md * 2;
  return { width, height: width * CONNECTED_CARD_ASPECT };
}

type Props = {
  card: CreditCard;
  onPress: () => void;
};

const NETWORK_LOGOS: Record<string, string> = {
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX',
  discover: 'DISC',
};

export default function ConnectedCard({ card, onPress }: Props) {
  const { width, height } = useConnectedCardSize();
  const util = card.balance / card.creditLimit;
  const utilPct = Math.round(util * 100);

  return (
    <PressableScale onPress={onPress} activeScale={0.975}>
      <View style={[styles.card, { width, height, backgroundColor: card.color }]}>
        <View style={styles.shimmer} pointerEvents="none" />
        {card.isLocked && (
          <View style={styles.lockBadge}>
            <Text style={styles.lockText}>Locked</Text>
          </View>
        )}

        <View style={styles.topRow}>
          <Text style={[styles.issuer, { color: card.textColor, opacity: 0.85 }]}>{card.issuer}</Text>
          <Text style={[styles.network, { color: card.textColor }]}>
            {NETWORK_LOGOS[card.network]}
          </Text>
        </View>

        <View style={styles.chipArea}>
          <View style={styles.chip} />
        </View>

        <View style={styles.bottomSection}>
          <Text style={[styles.cardNumber, { color: card.textColor }]}>
            •••• •••• •••• {card.last4}
          </Text>
          <View style={styles.bottomRow}>
            <View>
              <Text style={[styles.metaLabel, { color: card.textColor, opacity: 0.6 }]}>BALANCE</Text>
              <Text style={[styles.metaValue, { color: card.textColor }]}>
                ${card.balance.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text style={[styles.metaLabel, { color: card.textColor, opacity: 0.6 }]}>UTILIZATION</Text>
              <Text style={[styles.metaValue, { color: card.textColor }]}>{utilPct}%</Text>
            </View>
            <View>
              <Text style={[styles.metaLabel, { color: card.textColor, opacity: 0.6 }]}>BEST FOR</Text>
              <Text style={[styles.metaValue, { color: card.textColor }]}>{card.bestUsedFor.split('&')[0].trim()}</Text>
            </View>
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.card,
    padding: Spacing.md,
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  shimmer: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  lockBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md + 44,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lockText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Fonts.semibold,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  issuer: {
    fontSize: 13,
    fontWeight: Fonts.semibold,
    letterSpacing: 0.3,
  },
  network: {
    fontSize: 13,
    fontWeight: Fonts.bold,
    letterSpacing: 1,
  },
  chipArea: {
    marginTop: Spacing.sm,
  },
  chip: {
    width: 32,
    height: 24,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bottomSection: {
    gap: Spacing.sm,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: Fonts.medium,
    letterSpacing: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: Fonts.medium,
    letterSpacing: 1,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: Fonts.semibold,
  },
});
