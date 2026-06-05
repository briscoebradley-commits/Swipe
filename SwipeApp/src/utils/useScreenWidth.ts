import { Platform, useWindowDimensions } from 'react-native';

/** Logical width of the simulated iPhone frame used for the web preview. */
export const FRAME_WIDTH = 393; // iPhone 15 / 16 Pro logical width

/**
 * Returns the usable screen width. On a real device this is the full window
 * width; on web it is clamped to the iPhone frame so cards and layouts size
 * correctly inside the device mockup instead of stretching across the browser.
 */
export function useScreenWidth(): number {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' ? Math.min(width, FRAME_WIDTH) : width;
}
