import React from 'react';
import { Platform, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

type Props = {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  /** Scale to shrink to while pressed. */
  activeScale?: number;
  /** Disable haptic tap feedback. */
  noHaptics?: boolean;
  disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(
  require('react-native').Pressable
);

function triggerHaptic() {
  if (Platform.OS === 'web') return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

/**
 * A pressable wrapper that springs down on touch and fires a light haptic tap.
 * This is the tactile primitive used across the app for cards, rows and buttons
 * so every interaction feels native and responsive.
 */
export default function PressableScale({
  children,
  onPress,
  style,
  activeScale = 0.97,
  noHaptics,
  disabled,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(activeScale, { mass: 0.4, damping: 14, stiffness: 320 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { mass: 0.4, damping: 14, stiffness: 320 });
      }}
      onPress={(e: GestureResponderEvent) => {
        if (!noHaptics) triggerHaptic();
        onPress?.(e);
      }}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
