import React, { MemoExoticComponent } from 'react';

import { TableColumn } from './table-column';
import { IPropertyGrid } from './i-property-grid';

type IPropertyGridComponent = MemoExoticComponent<React.FC<IPropertyGrid<any>>>;

export class PropertyGridRow extends TableColumn {
  propertyGridCell?: IPropertyGridComponent;
  /**
   * Дочерние колонки
   */
  override columns: PropertyGridRow[];
  constructor(options?: {
    propertyGridCell?: IPropertyGridComponent;
    columns?: any[];
  }) {
    super(options);
    this.propertyGridCell = options?.propertyGridCell;
    this.columns = options?.columns?.map((x) => new PropertyGridRow(x)) ?? [];
  }
}
