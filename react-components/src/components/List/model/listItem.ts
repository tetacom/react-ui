import React from 'react';

export interface ListItem {
  key: string;
  headline: string;
  caption?: string;
  // TODO изображение временно строка, позже переделать на возможность передавать компонент аватара
  picture?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  disabled?: boolean;
}
