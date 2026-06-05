import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';

type Props = {
  type: 'success' | 'warning' | 'info';
  text: string;
};

const TYPE_CONFIG = {
  success: { color: Colors.positive, bg: 'rgba(52,199,89,0.08)', border: 'rgba(52,199,89,0.2)', icon: '↑' },
  warning: { color: Colors.warning, bg: 'rgba(255,159,10,0.08)', border: 'rgba(255,159,10,0.2)', icon: '!' },
  info: { color: '#4A9EFF', bg: 'rgba(74,158,255,0.08)', border: 'rgba(74,158,255,0.2)', icon: '→' },
};

export default function SavingsInsight({ type, text }: Props) {
  const cfg = TYPE_CONFIG[type];
  return (
    <View style={[styles.row, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <View style={[styles.dot, { backgroundColor: cfg.color }]}>
        <Text style={[styles.dotText, { color: Colors.bg }]}>{cfg.icon}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  dotText: {
    fontSize: 11,
    fontWeight: Fonts.bold,
  },
  text: {
    flex: 1,
    color: Colors.offWhite,
    fontSize: 13,
    fontWeight: Fonts.regular,
    lineHeight: 18,
  },
});
