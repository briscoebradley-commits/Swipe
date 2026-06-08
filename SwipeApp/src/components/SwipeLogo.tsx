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
      {/* Single continuous "S" stroke */}
      <Path
        d="M 68 30
           C 60 22, 45 21, 37 28
           C 29 35, 30 45, 41 49
           C 48 51, 53 49, 60 52
           C 71 56, 71 66, 63 73
           C 55 80, 40 79, 32 72"
        stroke={color}
        strokeWidth={12.5}
        strokeLinecap="round"
        strokeLinejoin="round"
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
