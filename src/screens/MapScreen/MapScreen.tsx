import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../design-system/colors';
import { typography } from '../../design-system/typography';

export function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map — Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.body,
    color: colors.text.body,
  },
});
