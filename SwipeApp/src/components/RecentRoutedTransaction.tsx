import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types';
import { CreditCard } from '../types';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';

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

type Props = {
  transaction: Transaction;
  card: CreditCard | undefined;
};

export default function RecentRoutedTransaction({ transaction, card }: Props) {
  const icon = CATEGORY_ICONS[transaction.category] ?? '💳';

  const rewardDisplay = transaction.rewardUnit === 'cashback'
    ? `+$${transaction.rewardEarned.toFixed(2)}`
    : `+${transaction.rewardEarned.toLocaleString()} pts`;

  const date = new Date(transaction.timestamp);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.topLine}>
          <Text style={styles.merchant}>{transaction.merchantName}</Text>
          <Text style={styles.amount}>${transaction.amount.toFixed(2)}</Text>
        </View>
        <View style={styles.routingLine}>
          <View style={[styles.cardDot, { backgroundColor: card?.color ?? Colors.muted }]} />
          <Text style={styles.routingText}>
            {card?.name ?? 'Unknown'} — {transaction.routingReason}
          </Text>
        </View>
        <View style={styles.bottomLine}>
          <Text style={styles.date}>{dateStr}</Text>
          <Text style={styles.reward}>{rewardDisplay}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  merchant: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.semibold,
  },
  amount: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.semibold,
  },
  routingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  routingText: {
    color: Colors.muted,
    fontSize: 12,
  },
  bottomLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: Colors.mutedSubtle,
    fontSize: 11,
  },
  reward: {
    color: Colors.positive,
    fontSize: 12,
    fontWeight: Fonts.semibold,
  },
});
