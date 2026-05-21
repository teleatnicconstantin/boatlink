import { StyleSheet } from 'react-native';
import { colors } from '../../design-system/colors';
import { typography } from '../../design-system/typography';
import { radius } from '../../design-system/radius';
import { shadows } from '../../design-system/shadows';

export const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.button,
  },
  light: {
    backgroundColor: colors.background.surface,
    ...shadows.card,
  },
  outlined: {
    backgroundColor: colors.background.dark,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  iconWrapper: {
    position: 'absolute',
    left: 18,
  },
  text: {
    ...typography.button,
  },
  textOnPrimary: {
    color: colors.text.onDark,
  },
  textOnLight: {
    color: colors.text.onLight,
  },
  textOnOutlined: {
    color: colors.text.onDark,
  },
  linkWrapper: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    ...typography.statusTime,
    color: colors.primary,
    textAlign: 'center',
  },
});
