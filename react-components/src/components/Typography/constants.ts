import { FontVariant, Levels } from './model';
import s from './style.module.scss';

export const DEFAULT_TYPE_FACE: FontVariant = 'body2';

export const typoClasses: Record<FontVariant, string> = {
  h1: s.typoH1,
  h2: s.typoH2,
  h3: s.typoH3,
  h4: s.typoH4,
  h5: s.typoH5,
  h6: s.typoH6,
  title1: s.typoTitle1,
  title2: s.typoTitle2,
  title3: s.typoTitle3,
  body1: s.typoBody1,
  body2: s.typoBody2,
  body3: s.typoBody3,
  caption: s.typoCaption,
  captionSemi: s.typoCaptionSemi,
  captionBold: s.typoCaptionBold,
  overline: s.typoOverline,
};

export const levelClasses: Record<Levels, string> = {
  1: s.typoH1,
  2: s.typoH2,
  3: s.typoH3,
  4: s.typoH4,
  5: s.typoH5,
  6: s.typoH6,
};
