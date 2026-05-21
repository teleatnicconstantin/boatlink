import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

export function ProfileIcon({ color = '#485769', size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} fill="none" />
      <Path
        d="M4 20c0-4 3.58-7 8-7s8 3 8 7"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
