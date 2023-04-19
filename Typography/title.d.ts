import React from 'react';
import { BaseProps, Levels } from './types';
export interface TitleProps extends BaseProps {
    level?: Levels;
}
export declare const Title: React.ForwardRefExoticComponent<TitleProps & React.RefAttributes<HTMLHeadingElement>>;
