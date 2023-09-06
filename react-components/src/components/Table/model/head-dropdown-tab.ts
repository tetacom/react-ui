import React from 'react';
import { TableColumn } from '../model/public-api';

export interface HeadDropdownTabConfig {
  strategy: 'merge' | 'replace';
  tabs?: HeadDropdownTab[];
}

export interface HeadDropdownTab {
  title?: string;
  icon?: string;
  template?: React.Ref<any>;
  order?: number;
  showTab: (column: TableColumn) => boolean;
}
