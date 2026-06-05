import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';
import { useScreenWidth } from '../utils/useScreenWidth';
import SwipeLogo from './SwipeLogo';

export const CARD_ASPECT = 0.585;

export default function SwipeCard() {
  const screenWidth = useScreenWidth();
  const cardWidth = screenWidth - Spacing.md * 2;
  const cardHeight = cardWidth * CARD_ASPECT;

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      {/* subtle matte sheen */}
      <View style={styles.sheen} pointerEvents="none" />

      <View style={styles.topRow}>
        <SwipeLogo size={28} color={Colors.white} wordmark wordmarkColor={Colors.white} />
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Auto-routing ON</Text>
        </View>
      </View>

      <View style={styles.middle}>
        <Text style={styles.tagline}>One card. Every reward optimized.</Text>
      </View>

      <View style={styles.chipRow}>
        <View style={styles.chip}>
          <View style={styles.chipLine} />
          <View style={styles.chipLine} />
        </View>
        <View style={styles.contactlessRing}>
          <View style={[styles.ring, styles.ring1]} />
          <View style={[styles.ring, styles.ring2]} />
          <View style={[styles.ring, styles.ring3]} />
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.label}>UNIVERSAL CARD</Text>
          <Text style={styles.cardNumber}>•••• •••• •••• 0001</Text>
        </View>
        <View style={styles.features}>
          <Text style={styles.featureText}>Protected by Swipe Safe</Text>
          <Text style={styles.featureText}>5 cards linked</Text>
        </View>
      </View>

      <View style={styles.gridOverlay} pointerEvents="none">
        {[...Array(8)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: `${(i + 1) * 12.5}%` }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.card,
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#2E2E2E',
    padding: Spacing.md,
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 14,
  },
  sheen: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.035)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 199, 89, 0.12)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(52, 199, 89, 0.3)',
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.positive,
  },
  statusText: {
    color: Colors.positive,
    fontSize: 10,
    fontWeight: Fonts.medium,
    letterSpacing: 0.3,
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
  },
  tagline: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: Fonts.light,
    letterSpacing: 0.2,
  },
  chipRow: {
    position: 'absolute',
    top: 64,
    left: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chip: {
    width: 36,
    height: 27,
    borderRadius: 5,
    backgroundColor: '#C9A84C',
    opacity: 0.92,
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 4,
  },
  chipLine: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 1,
  },
  contactlessRing: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
  },
  ring1: { width: 8, height: 8 },
  ring2: { width: 14, height: 14 },
  ring3: { width: 20, height: 20 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 9,
    fontWeight: Fonts.medium,
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  cardNumber: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: Fonts.medium,
    letterSpacing: 2,
  },
  features: {
    alignItems: 'flex-end',
    gap: 2,
  },
  featureText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 9,
    fontWeight: Fonts.regular,
    letterSpacing: 0.2,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gridLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
});
