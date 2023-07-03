import { ButtonHTMLAttributes } from 'react';

export type ButtonRef = HTMLButtonElement;

export type PaletteType = 'none' | 'green' | 'yellow' | 'red';
export type ViewType = 'primary' | 'outline' | 'ghost';
export type SizeType = 'small' | 'middle' | 'large';
export type ShapeType = 'brick' | 'round' | 'circle';

// TODO view outline желательно переименовать в secondary или в макетах secondary в outline
export interface ButtonProps extends ButtonHTMLAttributes<ButtonRef> {
  // Установить вид кнопки
  view?: ViewType;

  // Установить размер кнопки
  size?: SizeType;

  // Установить цвет кнопки
  palette?: PaletteType;

  // Установить форму кнопки
  shape?: ShapeType;

  // Сделать видимой в кнопке только первую иконку
  square?: boolean;

  // Возможность подогнать ширину кнопки под ширину ее родителя
  block?: boolean;

  // Установить статус загрузки кнопки
  loading?: boolean;

  // Отключить кнопку
  disabled?: boolean;

  // Загрузить файл
  file?: {
    inputId: string;
    acceptList: string[];
    onChange: (file: File) => void;
  };
}
