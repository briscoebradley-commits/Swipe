import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  accent?: string;
  badge?: string;
};

export default function MetricsCard({ title, value, subtitle, accent, badge }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.value, accent ? { color: accent } : {}]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: Fonts.medium,
    letterSpacing: 0.2,
  },
  value: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: Fonts.bold,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  subtitle: {
    color: Colors.mutedSubtle,
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    backgroundColor: 'rgba(52,199,89,0.12)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(52,199,89,0.3)',
  },
  badgeText: {
    color: Colors.positive,
    fontSize: 11,
    fontWeight: Fonts.semibold,
  },
});
