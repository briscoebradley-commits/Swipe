import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing,
} from 'react-native-reanimated';
import NearbyOfferCard from '../../src/components/NearbyOfferCard';
import SwipeLogo from '../../src/components/SwipeLogo';
import PressableScale from '../../src/components/PressableScale';
import { mockNearbyOffers } from '../../src/data/transactions';
import { Colors, Fonts, Radius, Spacing } from '../../src/utils/theme';
import { getCardById } from '../../src/utils/rewardsRouter';
import { useScreenWidth } from '../../src/utils/useScreenWidth';

const CATEGORIES = ['All', 'Dining', 'Groceries', 'Gas', 'Travel', 'Entertainment'];

const MAP_PINS = [
  { id: 'n1', x: 0.22, y: 0.3, color: '#C9A84C', label: 'S' },
  { id: 'n2', x: 0.55, y: 0.48, color: '#C9A84C', label: 'WF' },
  { id: 'n3', x: 0.75, y: 0.62, color: '#FF6B00', label: 'SH' },
  { id: 'n4', x: 0.38, y: 0.7, color: '#1A3A5C', label: 'M' },
  { id: 'n5', x: 0.62, y: 0.28, color: '#8B0000', label: 'A' },
  { id: 'n6', x: 0.15, y: 0.55, color: '#C9A84C', label: 'C' },
];

function UserPin() {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }), -1, false);
  }, []);
  const ringStyle = useAnimatedStyle(() => ({
    opacity: 1 - pulse.value,
    transform: [{ scale: 1 + pulse.value * 2.4 }],
  }));
  return (
    <View style={styles.userPin}>
      <Animated.View style={[styles.userPingRing, ringStyle]} />
      <View style={styles.userPinInner} />
    </View>
  );
}

export default function NearbyScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const screenWidth = useScreenWidth();
  const mapHeight = (screenWidth - Spacing.md * 2) * 0.58;

  const filtered = mockNearbyOffers.filter(o =>
    activeCategory === 'All' || o.category === activeCategory.toLowerCase()
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(450)} style={styles.brandBar}>
          <SwipeLogo size={18} color={Colors.muted} />
          <View style={styles.locationBadge}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>Rewards enabled</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(50).duration(450)} style={styles.header}>
          <Text style={styles.title}>Nearby</Text>
          <Text style={styles.subtitle}>Rewards around you</Text>
        </Animated.View>

        {/* Map */}
        <Animated.View entering={FadeInDown.delay(110).duration(500)} style={[styles.mapContainer, { height: mapHeight }]}>
          <View style={styles.mapGrid}>
            {[...Array(6)].map((_, i) => (
              <View key={`h${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 16}%` }]} />
            ))}
            {[...Array(6)].map((_, i) => (
              <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 16}%` }]} />
            ))}
          </View>

          {MAP_PINS.map(pin => (
            <View
              key={pin.id}
              style={[styles.mapPin, { left: `${pin.x * 100}%`, top: `${pin.y * 100}%`, backgroundColor: pin.color }]}
            >
              <Text style={styles.mapPinText}>{pin.label}</Text>
            </View>
          ))}

          <UserPin />

          <View style={styles.mapOverlayTop}>
            <View style={styles.mapBadge}>
              <Text style={styles.mapBadgeText}>San Francisco, CA</Text>
            </View>
            <View style={styles.mapBadge}>
              <Text style={[styles.mapBadgeText, { color: Colors.positive }]}>
                {filtered.length} offers nearby
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Category filter */}
        <Animated.View entering={FadeInDown.delay(160).duration(450)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}
          >
            {CATEGORIES.map(cat => (
              <PressableScale key={cat} onPress={() => setActiveCategory(cat)} activeScale={0.94}>
                <View style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}>
                  <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>
                    {cat}
                  </Text>
                </View>
              </PressableScale>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Offers */}
        <Animated.View entering={FadeInDown.delay(210).duration(450)} style={styles.offersSection}>
          {filtered.map((offer, i) => (
            <Animated.View key={offer.id} entering={FadeInDown.delay(240 + i * 50).duration(420)}>
              <NearbyOfferCard offer={offer} card={getCardById(offer.recommendedCardId)} />
            </Animated.View>
          ))}
          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <SwipeLogo size={36} color={Colors.mutedSubtle} />
              <Text style={styles.emptyText}>No nearby offers in this category</Text>
            </View>
          )}
        </Animated.View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  brandBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  header: {
    paddingBottom: Spacing.md,
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: Fonts.bold,
    letterSpacing: -0.6,
  },
  subtitle: {
    color: Colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.positive,
  },
  locationText: {
    color: Colors.positive,
    fontSize: 11,
    fontWeight: Fonts.medium,
  },
  mapContainer: {
    borderRadius: Radius.xl,
    backgroundColor: '#0F1117',
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  mapPin: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -15,
    marginTop: -15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  mapPinText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: Fonts.bold,
  },
  userPin: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -8,
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPinInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4A9EFF',
    borderWidth: 2,
    borderColor: Colors.white,
    zIndex: 2,
  },
  userPingRing: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(74,158,255,0.4)',
  },
  mapOverlayTop: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapBadge: {
    backgroundColor: 'rgba(10,10,10,0.8)',
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  mapBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: Fonts.medium,
  },
  filterScroll: {
    marginBottom: Spacing.md,
  },
  filterContent: {
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  filterText: {
    color: Colors.muted,
    fontSize: 13,
    fontWeight: Fonts.medium,
  },
  filterTextActive: {
    color: Colors.bg,
    fontWeight: Fonts.semibold,
  },
  offersSection: {},
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyText: {
    color: Colors.muted,
    fontSize: 14,
  },
});
