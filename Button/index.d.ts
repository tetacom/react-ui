import React, { ButtonHTMLAttributes } from 'react';
type PaletteType = 'green' | 'yellow' | 'red';
type ViewType = 'primary' | 'outline' | 'ghost';
type SizeType = 'small' | 'middle' | 'large';
type ShapeType = 'brick' | 'round' | 'circle';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    view?: ViewType;
    size?: SizeType;
    palette?: PaletteType;
    shape?: ShapeType;
    square?: boolean;
    block?: boolean;
    loading?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
