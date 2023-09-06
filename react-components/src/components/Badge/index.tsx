import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';

import { BadgeProps, PaletteType, ViewType } from './model';
import { Typography } from '../Typography';

import s from './style.module.scss';

const paletteColor: Record<PaletteType, string> = {
  primary: 'primary-60',
  green: 'green-60',
  yellow: 'yellow-60',
  red: 'red-60',
  text: 'text-60',
};
const viewClassNames: Record<ViewType, string> = {
  stroke: s.badgeStroke,
  fill: s.badgeFill,
};

export const Badge: FC<BadgeProps> = ({
  palette = 'primary',
  view = 'stroke',
  children,
}) => {
  const badgeColor = makeCssVarSyntax(paletteColor[palette]);
  const badgeBgColor = makeCssVarSyntax(
    [...(paletteColor[palette]?.split('-').slice(0, 1) ?? []), '5'].join('-'),
  );
  const badgeStyles = {
    '--color': badgeColor,
    '--bg-color': badgeBgColor,
  } as CSSProperties;

  return (
    <Typography.Text
      fontVariant="captionBold"
      className={classNames(s.badge, viewClassNames[view])}
      style={badgeStyles}
    >
      {children}
    </Typography.Text>
  );
};

function makeCssVarSyntax(code: string): string {
  return `var(--color-${code})`;
}
