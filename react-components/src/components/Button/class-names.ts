import { PaletteType, ShapeType, SizeType, ViewType } from './model';

import s from './style.module.scss';

export const sizeClasses: Record<SizeType, string> = {
  small: s.buttonSizeSmall,
  middle: s.buttonSizeMiddle,
  large: s.buttonSizeLarge,
};
export const shapeClasses: Record<ShapeType, string> = {
  brick: s.buttonShapeBrick,
  round: s.buttonShapeRound,
  circle: s.buttonShapeCircle,
};
export const viewClasses: Record<ViewType, string> = {
  primary: s.buttonViewPrimary,
  outline: s.buttonViewOutline,
  ghost: s.buttonViewGhost,
};
export const paletteClasses: Record<PaletteType, string> = {
  none: '',
  green: s.buttonPaletteGreen,
  yellow: s.buttonPaletteYellow,
  red: s.buttonPaletteRed,
};
export const disabledClasses: Record<ViewType, string> = {
  primary: s.disabledPrimary,
  outline: s.disabledOutline,
  ghost: s.disabledGhost,
};
