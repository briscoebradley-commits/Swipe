import React from 'react';
import {
  Modal, View, Text, StyleSheet, ScrollView, Platform,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CreditCard } from '../types';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';
import SwipeLogo from './SwipeLogo';
import PressableScale from './PressableScale';

type Props = {
  card: CreditCard | null;
  visible: boolean;
  onClose: () => void;
};

export default function CardDetailModal({ card, visible, onClose }: Props) {
  if (!card) return null;

  const util = card.balance / card.creditLimit;
  const utilPct = Math.round(util * 100);
  const available = card.creditLimit - card.balance;

  const rewardDisplay = card.pointUnit === 'cashback'
    ? `$${card.rewardsEarnedMonth.toFixed(2)}`
    : `${card.rewardsEarnedMonth.toLocaleString()} pts`;

  const yearlyDisplay = card.pointUnit === 'cashback'
    ? `$${card.rewardsEarnedYear.toFixed(2)}`
    : `${card.rewardsEarnedYear.toLocaleString()} pts`;

  const utilTone = util < 0.1 ? Colors.positive : util < 0.3 ? Colors.warning : Colors.negative;
  const utilWord = util < 0.1 ? 'Excellent' : util < 0.3 ? 'Good' : 'High';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={Platform.OS === 'web'}
      presentationStyle={Platform.OS === 'web' ? 'overFullScreen' : 'pageSheet'}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Grab handle */}
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>

        {/* Card hero */}
        <View style={[styles.cardPreview, { backgroundColor: card.color }]}>
          <View style={styles.cardShimmer} pointerEvents="none" />
          <View style={styles.cardTop}>
            <Text style={[styles.issuer, { color: card.textColor }]}>{card.issuer}</Text>
            <PressableScale onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>Done</Text>
            </PressableScale>
          </View>
          <SwipeLogo size={18} color={card.textColor} />
          <Text style={[styles.cardName, { color: card.textColor }]}>{card.name}</Text>
          <Text style={[styles.last4, { color: card.textColor, opacity: 0.7 }]}>
            •••• •••• •••• {card.last4}
          </Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.delay(40).duration(420)} style={styles.statsRow}>
            <StatBox label="Balance" value={`$${card.balance.toLocaleString()}`} />
            <StatBox label="Limit" value={`$${(card.creditLimit / 1000).toFixed(0)}K`} />
            <StatBox label="Available" value={`$${available.toLocaleString()}`} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(90).duration(420)}>
            <Section title="Utilization">
              <View style={styles.utilRow}>
                <Text style={styles.utilPct}>{utilPct}%</Text>
                <Text style={[styles.utilLabel, { color: utilTone }]}>{utilWord}</Text>
              </View>
              <View style={styles.utilBar}>
                <View style={[styles.utilFill, { width: `${Math.min(utilPct, 100)}%`, backgroundColor: utilTone }]} />
              </View>
            </Section>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(140).duration(420)}>
            <Section title="Rewards">
              <View style={styles.rewardGrid}>
                {card.rewardCategories.map((rc, i) => (
                  <View key={i} style={styles.rewardChip}>
                    <Text style={styles.rewardRate}>{rc.label}</Text>
                  </View>
                ))}
              </View>
            </Section>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(190).duration(420)}>
            <Section title="Rewards Earned">
              <View style={styles.statsRow}>
                <StatBox label="This Month" value={rewardDisplay} />
                <StatBox label="This Year" value={yearlyDisplay} />
                <StatBox label="Balance" value={card.pointUnit === 'cashback' ? `$${card.pointsBalance.toFixed(2)}` : `${card.pointsBalance.toLocaleString()}`} />
              </View>
            </Section>
          </Animated.View>

          {card.currentOffers.length > 0 && (
            <Animated.View entering={FadeInDown.delay(240).duration(420)}>
              <Section title="Current Offers">
                {card.currentOffers.map(offer => (
                  <View key={offer.id} style={styles.offerRow}>
                    <View style={styles.offerBadge}>
                      <Text style={styles.offerValue}>{offer.value}</Text>
                    </View>
                    <View style={styles.offerInfo}>
                      <Text style={styles.offerDesc}>{offer.description}</Text>
                      <Text style={styles.offerExpiry}>Expires {offer.expiresAt}</Text>
                    </View>
                  </View>
                ))}
              </Section>
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.delay(290).duration(420)}>
            <Section title="Card Controls">
              <View style={styles.controlRow}>
                <Text style={styles.controlLabel}>Card Status</Text>
                <View style={[styles.statusPill, { backgroundColor: card.isLocked ? 'rgba(255,59,48,0.15)' : 'rgba(52,199,89,0.15)' }]}>
                  <Text style={[styles.statusPillText, { color: card.isLocked ? Colors.negative : Colors.positive }]}>
                    {card.isLocked ? 'Locked' : 'Active'}
                  </Text>
                </View>
              </View>
            </Section>
          </Animated.View>

          {card.annualFee > 0 && (
            <Animated.View entering={FadeInDown.delay(340).duration(420)}>
              <Section title="Card Info">
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Annual Fee</Text>
                  <Text style={styles.infoValue}>${card.annualFee}/yr</Text>
                </View>
                {card.signupBonus && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Signup Bonus</Text>
                    <Text style={styles.infoValue}>{card.signupBonus}</Text>
                  </View>
                )}
                <View style={[styles.infoRow, styles.infoRowLast]}>
                  <Text style={styles.infoLabel}>Best Used For</Text>
                  <Text style={styles.infoValue}>{card.bestUsedFor}</Text>
                </View>
              </Section>
            </Animated.View>
          )}

          <View style={{ height: 48 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  handle: {
    width: 38,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  cardPreview: {
    margin: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    minHeight: 170,
    justifyContent: 'flex-end',
    gap: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  cardShimmer: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  cardTop: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  issuer: {
    fontSize: 14,
    fontWeight: Fonts.semibold,
    letterSpacing: 0.3,
  },
  closeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  closeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.semibold,
  },
  cardName: {
    fontSize: 22,
    fontWeight: Fonts.bold,
    letterSpacing: -0.3,
  },
  last4: {
    fontSize: 15,
    fontWeight: Fonts.medium,
    letterSpacing: 2,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  scrollContent: {
    paddingBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginVertical: Spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: Fonts.bold,
    marginBottom: 2,
  },
  statLabel: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: Fonts.medium,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: Fonts.semibold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  utilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  utilPct: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: Fonts.bold,
  },
  utilLabel: {
    fontSize: 14,
    fontWeight: Fonts.semibold,
  },
  utilBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  utilFill: {
    height: '100%',
    borderRadius: 3,
  },
  rewardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  rewardChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rewardRate: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: Fonts.medium,
  },
  offerRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  offerBadge: {
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
  },
  offerValue: {
    color: Colors.swipeGold,
    fontSize: 12,
    fontWeight: Fonts.bold,
  },
  offerInfo: {
    flex: 1,
  },
  offerDesc: {
    color: Colors.offWhite,
    fontSize: 13,
    fontWeight: Fonts.medium,
    marginBottom: 3,
  },
  offerExpiry: {
    color: Colors.muted,
    fontSize: 11,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  controlLabel: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.medium,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: Fonts.semibold,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    color: Colors.muted,
    fontSize: 14,
  },
  infoValue: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.medium,
    maxWidth: '60%',
    textAlign: 'right',
  },
});
