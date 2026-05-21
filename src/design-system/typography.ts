export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const;

export const typography = {
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  navLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
  },
  navLabelActive: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    lineHeight: 14,
  },
  statusTime: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: 21,
    lineHeight: 26,
  },
  marineName: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 23,
  },
  logo: {
    fontFamily: fontFamily.bold,
    fontSize: 31,
    lineHeight: 37,
  },
  mapLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    lineHeight: 13,
  },
  markerInitials: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    lineHeight: 14,
  },
  markerInitialsSmall: {
    fontFamily: fontFamily.bold,
    fontSize: 9.5,
    lineHeight: 12,
  },
  markerLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    lineHeight: 12,
  },
  markerLabelMd: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    lineHeight: 14,
  },
  coordinateStrip: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    lineHeight: 14,
  },
} as const;
