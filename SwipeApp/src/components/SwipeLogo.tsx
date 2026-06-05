import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts } from '../utils/theme';

type Props = {
  size?: number;
  color?: string;
  /** Show the "swipe" wordmark beside the mark */
  wordmark?: boolean;
  /** Override wordmark color (defaults to `color`) */
  wordmarkColor?: string;
};

/**
 * The official Swipe brand mark — two interlocking rounded hooks forming an "S".
 * Vector-based so it stays crisp at every size and can be recolored (black on
 * light surfaces, white on dark surfaces / cards).
 */
export default function SwipeLogo({ size = 40, color = Colors.white, wordmark, wordmarkColor }: Props) {
  const mark = (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Upper hook — C opening toward lower-right */}
      <Path
        d="M 43 59 A 19 19 0 1 1 62 40"
        stroke={color}
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      />
      {/* Lower hook — C opening toward upper-left */}
      <Path
        d="M 57 41 A 19 19 0 1 1 38 60"
        stroke={color}
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );

  if (!wordmark) return mark;

  return (
    <View style={styles.row}>
      {mark}
      <Text style={[styles.wordmark, { color: wordmarkColor ?? color, fontSize: size * 0.62 }]}>
        swipe
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wordmark: {
    fontWeight: Fonts.semibold,
    letterSpacing: -0.5,
  },
});
