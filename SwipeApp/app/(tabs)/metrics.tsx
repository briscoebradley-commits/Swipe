import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MetricsCard from '../../src/components/MetricsCard';
import SavingsInsight from '../../src/components/SavingsInsight';
import SwipeLogo from '../../src/components/SwipeLogo';
import CountUp from '../../src/components/CountUp';
import AnimatedBar from '../../src/components/AnimatedBar';
import { mockCards } from '../../src/data/cards';
import { Colors, Fonts, Radius, Spacing } from '../../src/utils/theme';
import { totalRewardsValueThisMonth, portfolioUtilization } from '../../src/utils/rewardsRouter';

const SPENDING_CATEGORIES = [
  { label: 'Dining', amount: 420, pct: 0.72 },
  { label: 'Groceries', amount: 310, pct: 0.53 },
  { label: 'Travel', amount: 820, pct: 1.0 },
  { label: 'Gas', amount: 180, pct: 0.31 },
  { label: 'Entertainment', amount: 95, pct: 0.16 },
  { label: 'Shopping', amount: 240, pct: 0.41 },
];

const CARD_PERFORMANCE = [
  { name: 'Amex Gold', value: '$84.20', change: '+$14.30 vs last month' },
  { name: 'Chase Sapphire', value: '$61.00', change: '+$8.60 vs last month' },
  { name: 'Capital One Savor', value: '$24.50', change: '+$2.10 vs last month' },
  { name: 'Citi Double Cash', value: '$8.42', change: '−$1.20 vs last month' },
  { name: 'Discover it', value: '$6.23', change: '+$3.40 vs last month' },
];

export default function MetricsScreen() {
  const totalMonthlyValue = totalRewardsValueThisMonth(mockCards);
  const utilization = portfolioUtilization(mockCards);
  const utilPct = Math.round(utilization * 100);

  const swipeExtra = 42.18;
  const yearlyProjected = totalMonthlyValue * 12;

  const utilTone = utilization < 0.1 ? Colors.positive : utilization < 0.3 ? Colors.warning : Colors.negative;
  const utilWord = utilization < 0.1 ? 'Excellent' : utilization < 0.3 ? 'Good' : 'Reduce';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(450)} style={styles.brandBar}>
          <SwipeLogo size={18} color={Colors.muted} />
          <Text style={styles.period}>June 2026</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(50).duration(450)}>
          <Text style={styles.title}>Metrics</Text>
        </Animated.View>

        {/* Hero value */}
        <Animated.View entering={FadeInDown.delay(110).duration(500)} style={styles.heroCard}>
          <Text style={styles.heroLabel}>TOTAL VALUE CREATED</Text>
          <CountUp value={totalMonthlyValue} prefix="$" decimals={2} style={styles.heroValue} />
          <Text style={styles.heroSub}>Rewards earned this month across all cards</Text>
          <View style={styles.heroRow}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>+${swipeExtra.toFixed(2)} via Swipe routing</Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats grid */}
        <Animated.View entering={FadeInDown.delay(170).duration(450)} style={styles.grid}>
          <View style={styles.gridHalf}>
            <MetricsCard
              title="Extra Rewards"
              value={`$${swipeExtra.toFixed(2)}`}
              subtitle="More than manual selection"
              accent={Colors.positive}
              badge="+28%"
            />
          </View>
          <View style={styles.gridHalf}>
            <MetricsCard
              title="Yearly Projected"
              value={`$${yearlyProjected.toFixed(0)}`}
              subtitle="At current pace"
            />
          </View>
        </Animated.View>

        {/* Credit optimization */}
        <Animated.View entering={FadeInDown.delay(230).duration(450)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Credit Optimization</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.utilRow}>
              <View>
                <Text style={styles.utilPct}>{utilPct}%</Text>
                <Text style={styles.utilLabel}>Portfolio Utilization</Text>
              </View>
              <View style={[styles.utilBadge, { backgroundColor: `${utilTone}22` }]}>
                <Text style={[styles.utilBadgeText, { color: utilTone }]}>{utilWord}</Text>
              </View>
            </View>
            <AnimatedBar progress={utilization} color={utilTone} delay={300} />
            <Text style={styles.utilNote}>
              Swipe distributes spend across cards to keep utilization optimal for your credit score.
            </Text>
          </View>
        </Animated.View>

        {/* Spending categories */}
        <Animated.View entering={FadeInDown.delay(290).duration(450)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spending Categories</Text>
          </View>
          <View style={styles.card}>
            {SPENDING_CATEGORIES.map((cat, i) => (
              <View key={i} style={[styles.catRow, i < SPENDING_CATEGORIES.length - 1 && styles.catBorder]}>
                <View style={styles.catInfo}>
                  <Text style={styles.catLabel}>{cat.label}</Text>
                  <Text style={styles.catAmount}>${cat.amount}</Text>
                </View>
                <AnimatedBar progress={cat.pct} color={Colors.white} height={4} delay={350 + i * 60} />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Card performance */}
        <Animated.View entering={FadeInDown.delay(350).duration(450)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Card Performance</Text>
          </View>
          <View style={styles.card}>
            {CARD_PERFORMANCE.map((c, i) => (
              <View key={i} style={[styles.perfRow, i < CARD_PERFORMANCE.length - 1 && styles.catBorder]}>
                <View style={styles.perfRank}>
                  <Text style={styles.perfRankText}>{i + 1}</Text>
                </View>
                <View style={styles.perfInfo}>
                  <Text style={styles.perfName}>{c.name}</Text>
                  <Text style={styles.perfChange}>{c.change}</Text>
                </View>
                <Text style={styles.perfValue}>{c.value}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Insights */}
        <Animated.View entering={FadeInDown.delay(410).duration(450)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Swipe Insights</Text>
          </View>
          <SavingsInsight type="success" text="Swipe earned you $42.18 more this month by routing purchases to better cards." />
          <SavingsInsight type="warning" text="You are overspending on dining compared to your monthly target. Consider reducing restaurant visits." />
          <SavingsInsight type="info" text="Pay $210 toward your Chase Sapphire balance to keep utilization below 15% on that card." />
          <SavingsInsight type="warning" text="Your gas rewards are weak. A stronger gas card could earn 5% instead of 2% on Shell purchases." />
          <SavingsInsight type="success" text="Your Amex Gold dining rewards are highly optimized — 4x on every restaurant transaction." />
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
  period: {
    color: Colors.muted,
    fontSize: 13,
    fontWeight: Fonts.medium,
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: Fonts.bold,
    letterSpacing: -0.6,
    marginBottom: Spacing.md,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  heroLabel: {
    color: Colors.muted,
    fontSize: 10,
    fontWeight: Fonts.semibold,
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  heroValue: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: Fonts.bold,
    letterSpacing: -1.5,
    lineHeight: 52,
  },
  heroSub: {
    color: Colors.muted,
    fontSize: 13,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  heroRow: {
    flexDirection: 'row',
  },
  heroBadge: {
    backgroundColor: 'rgba(52,199,89,0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(52,199,89,0.3)',
  },
  heroBadgeText: {
    color: Colors.positive,
    fontSize: 12,
    fontWeight: Fonts.semibold,
  },
  grid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  gridHalf: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: Fonts.semibold,
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  utilRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  utilPct: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: Fonts.bold,
    letterSpacing: -0.5,
  },
  utilLabel: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  utilBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  utilBadgeText: {
    fontSize: 13,
    fontWeight: Fonts.semibold,
  },
  utilNote: {
    color: Colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: Spacing.sm,
  },
  catRow: {
    paddingVertical: Spacing.sm,
  },
  catBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  catInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  catLabel: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.medium,
  },
  catAmount: {
    color: Colors.muted,
    fontSize: 14,
  },
  perfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  perfRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  perfRankText: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: Fonts.bold,
  },
  perfInfo: {
    flex: 1,
  },
  perfName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.medium,
  },
  perfChange: {
    color: Colors.muted,
    fontSize: 11,
    marginTop: 1,
  },
  perfValue: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: Fonts.semibold,
  },
});
