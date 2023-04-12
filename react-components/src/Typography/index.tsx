import React, { FC } from 'react';

import { Title } from './title';
import { Paragraph } from './paragraph';
import { Text } from './text';
import { Link } from './link';

export interface TypographyComposition extends React.PropsWithChildren {
  Title: typeof Title;
  Paragraph: typeof Paragraph;
  Text: typeof Text;
  Link: typeof Link;
}

const Typography: FC<React.PropsWithChildren> & TypographyComposition = ({
  children,
}) => {
  return <article>{children}</article>;
};

Typography.Title = Title;
Typography.Paragraph = Paragraph;
Typography.Text = Text;
Typography.Link = Link;

export { Typography };
