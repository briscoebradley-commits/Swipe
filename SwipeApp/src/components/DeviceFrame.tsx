import React from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Colors, Fonts } from '../utils/theme';
import { FRAME_WIDTH } from '../utils/useScreenWidth';

const FRAME_HEIGHT = 852; // iPhone 15 / 16 Pro logical height
const STATUS_BAR_H = 44;

/**
 * Wraps the app in a realistic iPhone mockup when running on web, so the
 * browser preview reads as a true mobile product (for demos / launch videos).
 * On a real device it renders children untouched.
 */
export default function DeviceFrame({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') return <>{children}</>;
  return <WebFrame>{children}</WebFrame>;
}

function WebFrame({ children }: { children: React.ReactNode }) {
  const { height: winH } = useWindowDimensions();
  const scale = Math.min(1, (winH - 24) / FRAME_HEIGHT);

  return (
    <View style={styles.page}>
      <View style={[styles.phoneBody, { transform: [{ scale }] }]}>
        <View style={styles.screen}>
          {/* Status bar band keeps app content clear of the dynamic island */}
          <View style={styles.statusBar}>
            <Text style={styles.statusTime}>9:41</Text>
            <View style={styles.island} />
            <View style={styles.statusIcons}>
              <View style={styles.signal} />
              <View style={styles.wifi} />
              <View style={styles.battery}>
                <View style={styles.batteryFill} />
              </View>
            </View>
          </View>

          {/* The app */}
          <View style={styles.appArea}>{children}</View>

          {/* Home indicator */}
          <View pointerEvents="none" style={styles.homeIndicatorWrap}>
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#0C0C0E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneBody: {
    width: FRAME_WIDTH + 24,
    height: FRAME_HEIGHT + 24,
    borderRadius: 64,
    backgroundColor: '#1A1A1C',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    borderWidth: 2,
    borderColor: '#2C2C2E',
  },
  screen: {
    flex: 1,
    borderRadius: 52,
    overflow: 'hidden',
    backgroundColor: Colors.bg,
  },
  statusBar: {
    height: STATUS_BAR_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    zIndex: 50,
  },
  statusTime: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: Fonts.semibold,
    width: 60,
  },
  island: {
    width: 110,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#000',
  },
  statusIcons: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
  },
  signal: {
    width: 16,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  wifi: {
    width: 14,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  battery: {
    width: 22,
    height: 11,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 1.5,
  },
  batteryFill: {
    flex: 1,
    borderRadius: 1,
    backgroundColor: Colors.white,
  },
  appArea: {
    flex: 1,
  },
  homeIndicatorWrap: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  homeIndicator: {
    width: 140,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.white,
    opacity: 0.55,
  },
});
