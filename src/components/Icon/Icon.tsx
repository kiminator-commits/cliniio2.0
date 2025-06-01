import React from 'react';
import Icon from '@mdi/react';
import type { IconProps } from '@mdi/react';

interface Props extends IconProps {
  size?: number;
  color?: string;
}

export default function MdiIcon({ size = 1, color = 'currentColor', ...rest }: Props) {
  return <Icon size={size} color={color} {...rest} />;
}
