import { StyleSheet } from 'react-native';
import { colors } from '../../design-system/colors';
import { typography } from '../../design-system/typography';
import { radius } from '../../design-system/radius';

// All absolute positions mirror Figma node 5:23 — valid for decorative map overlay
export const styles = StyleSheet.create({
  container: {
    width: 326,
    height: 180,
    borderRadius: radius.module,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    overflow: 'hidden',
    position: 'relative',
  },

  // Land edge — rotated rectangle in bottom-left area
  landEdgeWrapper: {
    position: 'absolute',
    left: -27,
    top: 114,
    width: 213,
    height: 106,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '5deg' }],
  },
  landEdge: {
    width: 206,
    height: 88,
    backgroundColor: 'rgba(20,46,83,0.9)',
    borderRadius: radius.module,
  },

  // Dock structures
  dockNorth: {
    position: 'absolute',
    left: 75,
    top: 57,
    width: 134,
    height: 6,
    backgroundColor: 'rgba(254,254,254,0.88)',
    borderRadius: 3,
  },
  dockA: {
    position: 'absolute',
    left: 95,
    top: 57,
    width: 6,
    height: 58,
    backgroundColor: 'rgba(254,254,254,0.88)',
    borderRadius: 3,
  },
  dockB: {
    position: 'absolute',
    left: 135,
    top: 57,
    width: 6,
    height: 66,
    backgroundColor: 'rgba(254,254,254,0.88)',
    borderRadius: 3,
  },
  dockC: {
    position: 'absolute',
    left: 177,
    top: 57,
    width: 6,
    height: 54,
    backgroundColor: 'rgba(254,254,254,0.88)',
    borderRadius: 3,
  },

  // Coordinate strip
  coordinateStrip: {
    position: 'absolute',
    left: 0,
    top: 135,
    width: 326,
    height: 44,
    backgroundColor: 'rgba(4,23,50,0.82)',
  },

  // Header
  marinaName: {
    position: 'absolute',
    left: 17,
    top: 15,
    ...typography.mapLabel,
    color: colors.text.tertiary,
    width: 160,
  },
  captainsVisible: {
    position: 'absolute',
    left: 17,
    top: 33,
    ...typography.markerLabelMd,
    color: colors.text.onDark,
    width: 150,
  },

  // Online indicator
  onlineDot: {
    position: 'absolute',
    left: 246,
    top: 24,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.online,
  },
  onlineLabel: {
    position: 'absolute',
    left: 261,
    top: 21,
    ...typography.mapLabel,
    color: colors.primary,
    fontSize: 11,
    lineHeight: 14,
    width: 48,
  },

  // You marker
  youAccuracy: {
    position: 'absolute',
    left: 85,
    top: 69,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(11,110,200,0.12)',
  },
  youOuter: {
    position: 'absolute',
    left: 97,
    top: 81,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(11,110,200,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(11,110,200,0.5)',
  },
  youDot: {
    position: 'absolute',
    left: 103,
    top: 87,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  youLabel: {
    position: 'absolute',
    left: 86,
    top: 116,
    width: 54,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  youLabelText: {
    ...typography.markerLabel,
    color: colors.primary,
    textAlign: 'center',
  },

  // Maya marker
  mayaPulse: {
    position: 'absolute',
    left: 193,
    top: 57,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(11,110,200,0.18)',
  },
  mayaOuter: {
    position: 'absolute',
    left: 200,
    top: 64,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.text.onDark,
  },
  mayaDot: {
    position: 'absolute',
    left: 205,
    top: 69,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mayaInitials: {
    ...typography.markerInitials,
    color: colors.text.onDark,
    textAlign: 'center',
  },
  mayaLabel: {
    position: 'absolute',
    left: 182,
    top: 103,
    width: 74,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mayaLabelText: {
    ...typography.markerLabelMd,
    color: colors.text.onLight,
    textAlign: 'center',
  },

  // AR marker
  arOuter: {
    position: 'absolute',
    left: 152,
    top: 108,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.text.onDark,
    borderWidth: 2,
    borderColor: colors.divider.light,
  },
  arDot: {
    position: 'absolute',
    left: 155,
    top: 111,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.text.onDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // JP marker
  jpOuter: {
    position: 'absolute',
    left: 253,
    top: 87,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.text.onDark,
    borderWidth: 2,
    borderColor: colors.divider.light,
  },
  jpDot: {
    position: 'absolute',
    left: 256,
    top: 90,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.text.onDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  markerInitialsSmall: {
    ...typography.markerInitialsSmall,
    color: colors.text.onLight,
    textAlign: 'center',
  },

  // Coordinate text in the strip
  coordinateText: {
    position: 'absolute',
    left: 17,
    top: 149,
    ...typography.coordinateStrip,
    color: colors.text.secondary,
    width: 290,
  },
});
