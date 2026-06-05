import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import SwipeLogo from '../src/components/SwipeLogo';
import { Colors, Fonts } from '../src/utils/theme';

export default function SplashScreen() {
  const markOpacity = useSharedValue(0);
  const markScale = useSharedValue(0.8);
  const taglineOpacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    markOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    markScale.value = withSequence(
      withTiming(1.04, { duration: 650, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 250, easing: Easing.inOut(Easing.quad) })
    );
    taglineOpacity.value = withDelay(550, withTiming(1, { duration: 500 }));

    // Hold, then fade out and enter the app.
    screenOpacity.value = withDelay(
      1900,
      withTiming(0, { duration: 450, easing: Easing.in(Easing.cubic) }, (finished) => {
        if (finished) runOnJS(router.replace)('/home');
      })
    );
  }, []);

  const markStyle = useAnimatedStyle(() => ({
    opacity: markOpacity.value,
    transform: [{ scale: markScale.value }],
  }));
  const taglineStyle = useAnimatedStyle(() => ({ opacity: taglineOpacity.value }));
  const screenStyle = useAnimatedStyle(() => ({ opacity: screenOpacity.value }));

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <View style={styles.center}>
        <Animated.View style={markStyle}>
          <SwipeLogo size={84} color={Colors.white} />
        </Animated.View>
        <Animated.View style={taglineStyle}>
          <Text style={styles.wordmark}>swipe</Text>
        </Animated.View>
      </View>
      <Animated.View style={[styles.footer, taglineStyle]}>
        <Text style={styles.tagline}>One card. Every reward optimized.</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 14,
  },
  wordmark: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: Fonts.bold,
    letterSpacing: -1,
  },
  footer: {
    position: 'absolute',
    bottom: 64,
  },
  tagline: {
    color: Colors.muted,
    fontSize: 14,
    fontWeight: Fonts.regular,
    letterSpacing: 0.2,
  },
});
