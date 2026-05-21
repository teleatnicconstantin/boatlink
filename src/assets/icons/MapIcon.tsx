import React from 'react';
import Svg, { Path, Polyline } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

export function MapIcon({ color = '#485769', size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M8 2v16M16 6v16"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}
