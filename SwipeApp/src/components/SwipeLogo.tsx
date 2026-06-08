import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts } from '../utils/theme';

// The official Swipe mark (cleaned to a transparent, tintable PNG).
const LOGO = require('../../assets/swipe-logo.png');

type Props = {
  size?: number;
  color?: string;
  /** Show the "swipe" wordmark beside the mark */
  wordmark?: boolean;
  /** Override wordmark color (defaults to `color`) */
  wordmarkColor?: string;
};

/**
 * The official Swipe brand mark, rendered from the source artwork and tinted so
 * it appears white on dark surfaces and adapts to card colors. `size` controls
 * the mark's height.
 */
export default function SwipeLogo({ size = 40, color = Colors.white, wordmark, wordmarkColor }: Props) {
  const mark = (
    <Image
      source={LOGO}
      resizeMode="contain"
      style={{ width: size, height: size, tintColor: color }}
    />
  );

  if (!wordmark) return mark;

  return (
    <View style={styles.row}>
      {mark}
      <Text style={[styles.wordmark, { color: wordmarkColor ?? color, fontSize: size * 0.6 }]}>
        swipe
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  wordmark: {
    fontWeight: Fonts.semibold,
    letterSpacing: -0.5,
  },
});
