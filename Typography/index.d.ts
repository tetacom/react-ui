import React, { FC } from 'react';
import { Title } from './title';
import { Paragraph } from './paragraph';
import { Text } from './text';
import { Link } from './link';
interface TypographyComposition extends React.PropsWithChildren {
    Title: typeof Title;
    Paragraph: typeof Paragraph;
    Text: typeof Text;
    Link: typeof Link;
}
declare const Typography: FC<React.PropsWithChildren> & TypographyComposition;
export { Typography };
