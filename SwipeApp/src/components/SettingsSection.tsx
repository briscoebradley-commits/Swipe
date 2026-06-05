import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '../utils/theme';

type SettingItem = {
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'action';
  value?: boolean;
  selected?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
};

type Props = {
  title: string;
  items: SettingItem[];
};

export default function SettingsSection({ title, items }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.group}>
        {items.map((item, i) => (
          <View key={i} style={[styles.row, i < items.length - 1 && styles.rowBorder]}>
            <View style={styles.labelArea}>
              <Text style={styles.label}>{item.label}</Text>
              {item.description && <Text style={styles.description}>{item.description}</Text>}
            </View>
            {item.type === 'toggle' && item.onToggle && (
              <Switch
                value={item.value ?? false}
                onValueChange={item.onToggle}
                trackColor={{ false: Colors.border, true: Colors.positive }}
                thumbColor={Colors.white}
              />
            )}
            {item.type === 'select' && (
              <View style={[styles.selectedBadge, item.selected && styles.selectedActive]}>
                <Text style={[styles.selectedText, item.selected && styles.selectedTextActive]}>
                  {item.selected ? 'Active' : 'Select'}
                </Text>
              </View>
            )}
            {item.type === 'action' && (
              <TouchableOpacity onPress={item.onPress}>
                <Text style={styles.actionText}>›</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: Fonts.semibold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  group: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  labelArea: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  label: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Fonts.medium,
  },
  description: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  selectedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: Colors.white,
  },
  selectedText: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: Fonts.medium,
  },
  selectedTextActive: {
    color: Colors.white,
  },
  actionText: {
    color: Colors.muted,
    fontSize: 20,
    lineHeight: 22,
  },
});
