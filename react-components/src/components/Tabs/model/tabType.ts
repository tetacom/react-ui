import React from 'react';

export type TabType = {
  key: string;
  label: string | React.ReactElement;
  children?: string | React.ReactElement;
  disabled?: boolean;
  icon?: React.ReactElement;
};
