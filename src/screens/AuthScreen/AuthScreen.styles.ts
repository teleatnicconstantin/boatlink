import { StyleSheet } from 'react-native';
import { colors } from '../../design-system/colors';
import { typography } from '../../design-system/typography';
import { spacing } from '../../design-system/spacing';
import { radius } from '../../design-system/radius';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    paddingHorizontal: spacing[32],
    paddingTop: spacing[14],
    paddingBottom: spacing[32],
  },

  // Logo row
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[12],
    marginBottom: spacing[16],
  },
  logoBadge: {
    width: 78,
    height: 62,
    borderRadius: radius.xl,
    borderWidth: 1.4,
    borderColor: 'rgba(166,195,217,0.85)',
    borderStyle: 'dashed',
    backgroundColor: colors.background.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoBadgeInner: {
    width: 34,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 1.2,
    borderColor: 'rgba(11,110,200,0.45)',
    borderStyle: 'dashed',
    backgroundColor: colors.accent.bg,
    marginBottom: 14,
  },
  logoText: {
    ...typography.logo,
    color: colors.text.onDark,
  },
  logoTextBlue: {
    color: colors.primary,
  },

  // Tagline
  tagline: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing[16],
  },

  // Map module
  mapModuleWrapper: {
    marginBottom: spacing[16],
  },

  // Section label
  sectionLabel: {
    ...typography.sectionLabel,
    color: colors.primary,
    marginBottom: spacing[8],
    letterSpacing: 0.5,
  },

  // Button group
  buttonGroup: {
    gap: spacing[12],
    marginBottom: spacing[12],
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[12],
    gap: spacing[8],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.background.card,
  },
  dividerText: {
    ...typography.caption,
    color: colors.text.tertiary,
  },

  // Footer
  footer: {
    marginTop: spacing[24],
    alignItems: 'center',
    gap: spacing[4],
  },
  footerText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  footerSubText: {
    ...typography.body,
    fontSize: 12,
    lineHeight: 16,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
