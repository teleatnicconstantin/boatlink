import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../design-system/colors';
import { typography } from '../design-system/typography';
import { shadows } from '../design-system/shadows';
import { LocationsIcon } from '../assets/icons/LocationsIcon';
import { MapIcon } from '../assets/icons/MapIcon';
import { MessagesIcon } from '../assets/icons/MessagesIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';
import { SosAlertIcon } from '../assets/icons/SosAlertIcon';

const TAB_BAR_HEIGHT = 64;
const SOS_BUTTON_SIZE = 54;
const SOS_LIFT = 12;

function TabIcon({ routeName, color }: { routeName: string; color: string }) {
  switch (routeName) {
    case 'Locations':
      return <LocationsIcon color={color} size={24} />;
    case 'Map':
      return <MapIcon color={color} size={24} />;
    case 'Messages':
      return <MessagesIcon color={color} size={24} />;
    case 'Profile':
      return <ProfileIcon color={color} size={24} />;
    default:
      return null;
  }
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={[styles.container, shadows.bottomNav]}>
        <View style={styles.border} />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (route.name === 'SOS') {
            return (
              <View key={route.key} style={styles.sosWrapper}>
                <Pressable onPress={() => {}} style={styles.sosButton}>
                  <SosAlertIcon color={colors.text.onDark} size={22} />
                  <Text style={styles.sosLabel}>SOS</Text>
                </Pressable>
              </View>
            );
          }

          const iconColor = isFocused ? colors.primary : colors.text.body;
          const labelStyle = isFocused ? styles.labelActive : styles.label;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}>
              <TabIcon routeName={route.name} color={iconColor} />
              <Text style={[labelStyle, { color: iconColor }]}>{route.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.white,
  },
  container: {
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    position: 'relative',
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.divider.light,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12,
    gap: 4,
  },
  sosWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -(SOS_LIFT + SOS_BUTTON_SIZE / 2 - TAB_BAR_HEIGHT / 2),
  },
  sosButton: {
    width: SOS_BUTTON_SIZE,
    height: SOS_BUTTON_SIZE,
    borderRadius: SOS_BUTTON_SIZE / 2,
    backgroundColor: '#e8330a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    shadowColor: '#041732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    ...typography.navLabel,
  },
  labelActive: {
    ...typography.navLabelActive,
  },
  sosLabel: {
    ...typography.markerLabel,
    color: colors.text.onDark,
    fontSize: 10,
    lineHeight: 12,
  },
});
