import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import SettingsSection from '../../src/components/SettingsSection';
import SwipeLogo from '../../src/components/SwipeLogo';
import PressableScale from '../../src/components/PressableScale';
import { Colors, Fonts, Radius, Spacing } from '../../src/utils/theme';

type Strategy = 'maximize_rewards' | 'cashback' | 'travel' | 'protect_score';

export default function SettingsScreen() {
  const [strategy, setStrategy] = useState<Strategy>('maximize_rewards');
  const [avoidHighUtil, setAvoidHighUtil] = useState(true);
  const [faceId, setFaceId] = useState(true);
  const [purchaseVerif, setPurchaseVerif] = useState(false);
  const [unusualAlerts, setUnusualAlerts] = useState(true);
  const [locationAlerts, setLocationAlerts] = useState(true);
  const [nearbyNotifs, setNearbyNotifs] = useState(true);
  const [spendingAlerts, setSpendingAlerts] = useState(true);
  const [utilAlerts, setUtilAlerts] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [newOffers, setNewOffers] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(450)} style={styles.brandBar}>
          <SwipeLogo size={18} color={Colors.muted} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(50).duration(450)} style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </Animated.View>

        {/* Profile card */}
        <Animated.View entering={FadeInDown.delay(100).duration(450)}>
          <PressableScale onPress={() => {}}>
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>B</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Bradley</Text>
                <Text style={styles.profileEmail}>bradley@swipe.finance</Text>
              </View>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>PRO</Text>
              </View>
            </View>
          </PressableScale>
        </Animated.View>

        {/* Routing strategy */}
        <Animated.View entering={FadeInDown.delay(150).duration(450)}>
          <View style={styles.sectionLabel}>
            <Text style={styles.sectionLabelText}>ROUTING STRATEGY</Text>
          </View>
          <View style={styles.strategyGrid}>
            {([
              { id: 'maximize_rewards', label: 'Max Rewards', icon: '◈' },
              { id: 'cashback', label: 'Cashback', icon: '⊕' },
              { id: 'travel', label: 'Travel Points', icon: '◎' },
              { id: 'protect_score', label: 'Protect Score', icon: '⊞' },
            ] as { id: Strategy; label: string; icon: string }[]).map(s => (
              <PressableScale key={s.id} onPress={() => setStrategy(s.id)} activeScale={0.96} style={styles.strategyPressable}>
                <View style={[styles.strategyCard, strategy === s.id && styles.strategyCardActive]}>
                  <Text style={[styles.strategyIcon, strategy === s.id && styles.strategyIconActive]}>{s.icon}</Text>
                  <Text style={[styles.strategyLabel, strategy === s.id && styles.strategyLabelActive]}>{s.label}</Text>
                </View>
              </PressableScale>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(450)}>
          <SettingsSection
            title="Routing Preferences"
            items={[
              {
                label: 'Avoid High Utilization Cards',
                description: 'Skip cards above your utilization target',
                type: 'toggle',
                value: avoidHighUtil,
                onToggle: setAvoidHighUtil,
              },
              {
                label: 'Default Fallback Card',
                description: 'Citi Double Cash',
                type: 'action',
                onPress: () => Alert.alert('Coming soon', 'Card selection will be available in the next update.'),
              },
            ]}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(250).duration(450)}>
          <SettingsSection
            title="Card Controls"
            items={[
              {
                label: 'Lock All Cards',
                description: 'Freeze all card routing immediately',
                type: 'action',
                onPress: () => Alert.alert('Lock All Cards', 'This will pause routing on all connected cards.'),
              },
              { label: 'Manage Individual Cards', description: 'Lock, unlock, or set limits per card', type: 'action', onPress: () => Alert.alert('Coming soon') },
              { label: 'Category Spending Limits', description: 'Set limits per category per card', type: 'action', onPress: () => Alert.alert('Coming soon') },
            ]}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(450)}>
          <SettingsSection
            title="Swipe Safe"
            items={[
              { label: 'Face ID', description: 'Require Face ID for high-value transactions', type: 'toggle', value: faceId, onToggle: setFaceId },
              { label: 'Purchase Verification', description: 'Confirm all purchases over $100', type: 'toggle', value: purchaseVerif, onToggle: setPurchaseVerif },
              { label: 'Unusual Transaction Alerts', description: 'Get notified of suspicious activity', type: 'toggle', value: unusualAlerts, onToggle: setUnusualAlerts },
              { label: 'Location Mismatch Alerts', description: 'Alert when card used far from your location', type: 'toggle', value: locationAlerts, onToggle: setLocationAlerts },
            ]}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(350).duration(450)}>
          <SettingsSection
            title="Notifications"
            items={[
              { label: 'Nearby Reward Alerts', type: 'toggle', value: nearbyNotifs, onToggle: setNearbyNotifs },
              { label: 'Spending Alerts', type: 'toggle', value: spendingAlerts, onToggle: setSpendingAlerts },
              { label: 'Utilization Alerts', type: 'toggle', value: utilAlerts, onToggle: setUtilAlerts },
              { label: 'Payment Reminders', type: 'toggle', value: paymentReminders, onToggle: setPaymentReminders },
              { label: 'New Offer Alerts', type: 'toggle', value: newOffers, onToggle: setNewOffers },
            ]}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(450)}>
          <SettingsSection
            title="Account"
            items={[
              { label: 'Connected Banks', description: 'Manage linked financial institutions', type: 'action', onPress: () => Alert.alert('Coming soon') },
              { label: 'Linked Cards', description: '5 cards connected', type: 'action', onPress: () => Alert.alert('Coming soon') },
              { label: 'Privacy & Data', type: 'action', onPress: () => Alert.alert('Coming soon') },
            ]}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(450).duration(450)}>
          <PressableScale onPress={() => {}} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </PressableScale>

          <View style={styles.versionRow}>
            <SwipeLogo size={28} color={Colors.mutedSubtle} />
            <Text style={styles.versionText}>Swipe v1.0.0 — Demo Build</Text>
          </View>
        </Animated.View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  brandBar: {
    flexDirection: 'row',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  header: {
    paddingBottom: Spacing.md,
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: Fonts.bold,
    letterSpacing: -0.6,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.swipeGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: Fonts.bold,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: Fonts.semibold,
  },
  profileEmail: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  premiumBadge: {
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(201,168,76,0.4)',
  },
  premiumText: {
    color: Colors.swipeGold,
    fontSize: 11,
    fontWeight: Fonts.bold,
    letterSpacing: 1,
  },
  sectionLabel: {
    marginBottom: Spacing.sm,
  },
  sectionLabelText: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: Fonts.semibold,
    letterSpacing: 1,
  },
  strategyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  strategyPressable: {
    width: '47.5%',
  },
  strategyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  strategyCardActive: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  strategyIcon: {
    fontSize: 22,
    color: Colors.muted,
  },
  strategyIconActive: {
    color: Colors.bg,
  },
  strategyLabel: {
    color: Colors.muted,
    fontSize: 13,
    fontWeight: Fonts.medium,
    textAlign: 'center',
  },
  strategyLabelActive: {
    color: Colors.bg,
    fontWeight: Fonts.semibold,
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,59,48,0.08)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,59,48,0.2)',
    marginBottom: Spacing.md,
  },
  logoutText: {
    color: Colors.negative,
    fontSize: 15,
    fontWeight: Fonts.semibold,
  },
  versionRow: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  versionText: {
    color: Colors.mutedSubtle,
    fontSize: 11,
  },
});
