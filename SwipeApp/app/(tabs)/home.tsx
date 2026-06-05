import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import SwipeCard from '../../src/components/SwipeCard';
import SwipeLogo from '../../src/components/SwipeLogo';
import ConnectedCard, { useConnectedCardSize } from '../../src/components/ConnectedCard';
import CardDetailModal from '../../src/components/CardDetailModal';
import RecentRoutedTransaction from '../../src/components/RecentRoutedTransaction';
import PressableScale from '../../src/components/PressableScale';
import { mockCards } from '../../src/data/cards';
import { mockTransactions } from '../../src/data/transactions';
import { Colors, Fonts, Spacing } from '../../src/utils/theme';
import { CreditCard } from '../../src/types';
import { getCardById } from '../../src/utils/rewardsRouter';

const STACK_PEEK = 50;

export default function HomeScreen() {
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [expandedStack, setExpandedStack] = useState(false);
  const { height: cardHeight } = useConnectedCardSize();

  const recentTxns = mockTransactions.slice(0, 4);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand bar */}
        <Animated.View entering={FadeInDown.duration(450)} style={styles.brandBar}>
          <SwipeLogo size={22} color={Colors.white} wordmark />
          <PressableScale style={styles.notifBtn} onPress={() => {}}>
            <Text style={styles.notifIcon}>◯</Text>
          </PressableScale>
        </Animated.View>

        {/* Greeting */}
        <Animated.View entering={FadeInDown.delay(60).duration(450)} style={styles.header}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.name}>Bradley</Text>
        </Animated.View>

        {/* Swipe Card */}
        <Animated.View entering={FadeInDown.delay(120).duration(500)} style={styles.swipeCardWrap}>
          <SwipeCard />
        </Animated.View>

        {/* Portfolio Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Card Portfolio</Text>
          <PressableScale onPress={() => setExpandedStack(v => !v)}>
            <Text style={styles.sectionAction}>{expandedStack ? 'Collapse' : 'Expand all'}</Text>
          </PressableScale>
        </Animated.View>

        {/* Apple Wallet stack — animates between stacked & expanded */}
        <Animated.View entering={FadeInDown.delay(240).duration(500)} style={styles.stackWrap}>
          {mockCards.map((card, i) => (
            <Animated.View
              key={card.id}
              layout={LinearTransition.springify().damping(18).stiffness(160)}
              style={{
                marginTop: i === 0 ? 0 : expandedStack ? Spacing.md : -(cardHeight - STACK_PEEK),
                zIndex: i,
              }}
            >
              <ConnectedCard card={card} onPress={() => setSelectedCard(card)} />
            </Animated.View>
          ))}
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View entering={FadeInDown.delay(300).duration(450)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Routing</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.sectionMeta}>Auto-optimized</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(340).duration(450)} style={styles.activityCard}>
          {recentTxns.map(txn => (
            <RecentRoutedTransaction
              key={txn.id}
              transaction={txn}
              card={getCardById(txn.routedCardId)}
            />
          ))}
        </Animated.View>

        <View style={{ height: 110 }} />
      </ScrollView>

      <CardDetailModal
        card={selectedCard}
        visible={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
      />
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
  greeting: {
    color: Colors.muted,
    fontSize: 14,
    fontWeight: Fonts.regular,
    letterSpacing: 0.2,
  },
  name: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: Fonts.bold,
    letterSpacing: -0.5,
  },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: {
    color: Colors.muted,
    fontSize: 16,
  },
  swipeCardWrap: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: Fonts.semibold,
    letterSpacing: -0.3,
  },
  sectionAction: {
    color: Colors.muted,
    fontSize: 13,
    fontWeight: Fonts.medium,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.positive,
  },
  sectionMeta: {
    color: Colors.positive,
    fontSize: 12,
    fontWeight: Fonts.medium,
  },
  stackWrap: {
    marginBottom: Spacing.lg,
  },
  activityCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
