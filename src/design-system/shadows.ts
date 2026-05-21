import { Platform } from 'react-native';

const shadowColor = '#041732';

export const shadows = {
  card: Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 9,
    },
    android: { elevation: 5 },
  }),
  button: Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.22,
      shadowRadius: 10,
    },
    android: { elevation: 8 },
  }),
  modal: Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
    },
    android: { elevation: 10 },
  }),
  bottomNav: Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
    },
    android: { elevation: 16 },
  }),
  markerLabel: Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    android: { elevation: 3 },
  }),
} as const;
