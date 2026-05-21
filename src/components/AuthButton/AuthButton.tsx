import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './AuthButton.styles';

type Variant = 'primary' | 'light' | 'outlined' | 'link';

interface Props {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  leftIcon?: React.ReactNode;
}

export function AuthButton({ label, variant = 'primary', onPress, leftIcon }: Props) {
  if (variant === 'link') {
    return (
      <Pressable onPress={onPress} style={styles.linkWrapper}>
        <Text style={styles.linkText}>{label}</Text>
      </Pressable>
    );
  }

  const containerStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'light' && styles.light,
    variant === 'outlined' && styles.outlined,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.textOnPrimary,
    variant === 'light' && styles.textOnLight,
    variant === 'outlined' && styles.textOnOutlined,
  ];

  return (
    <Pressable onPress={onPress} style={containerStyle}>
      {leftIcon ? <View style={styles.iconWrapper}>{leftIcon}</View> : null}
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}
