import React, { useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withTiming, Easing } from 'react-native-reanimated';
import { Colors } from '../utils/theme';

type Props = {
  /** Fill fraction 0–1. */
  progress: number;
  color?: string;
  height?: number;
  trackColor?: string;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

/** A progress bar whose fill eases out from 0 on mount. */
export default function AnimatedBar({
  progress,
  color = Colors.white,
  height = 6,
  trackColor = Colors.border,
  delay = 0,
  style,
}: Props) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(delay, withTiming(Math.min(Math.max(progress, 0), 1), {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    }));
  }, [progress, delay]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height / 2 }, style]}>
      <Animated.View style={[{ height, backgroundColor: color, borderRadius: height / 2 }, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});
