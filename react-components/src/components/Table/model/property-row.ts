import React, { MemoExoticComponent } from 'react';

import { TableColumn } from './table-column';
import { IPropertyGrid } from './i-property-grid';
import { LockedColumn } from './enum/locked-column.enum';
import { FilterType } from './enum/filter-type.enum';
import { StringFilterType } from './enum/string-filter-type.enum';
import { ListFilterType } from './enum/list-filter-type.enum';
import { CustomCellComponent } from './cell-component';
import { HeadDropdownTabConfig } from './head-dropdown-tab';
import { AggregationType } from './enum/aggregation-type.enum';

type IPropertyGridComponent = MemoExoticComponent<React.FC<IPropertyGrid<any>>>;

export class PropertyGridRow extends TableColumn {
  propertyGridCell?: IPropertyGridComponent;
  /**
   * Дочерние колонки
   */
  override columns: PropertyGridRow[];
  constructor(options?: {
    width?: number;
    flex?: number;
    sortOrder?: number;
    locked?: LockedColumn;
    hidden?: boolean;
    name?: string;
    parentName?: string;
    propertyName?: string;
    caption?: string;
    hint?: string;
    unit?: string;
    unitMeasureParameterId?: number;
    unitId?: number;
    sortable?: boolean;
    sortField?: string;
    filterable?: boolean;
    filterField?: string;
    filterType?: FilterType | null;
    stringFilterType?: StringFilterType;
    listFilterType?: ListFilterType;
    strict?: boolean;
    headCellClass?: string[];
    cellClass?: string[];
    data?: any;
    editable?: boolean; // | ((coordinates: ICellInstance<any>) => boolean);
    objectType?: boolean;
    cellComponent?: CustomCellComponent;
    headCellComponent?: any;
    headDropdownConfig?: HeadDropdownTabConfig;
    filterComponent?: any;
    aggregate?: AggregationType;
    defaultValue?: any;
    maxValue?: number;
    minValue?: number;
    required?: boolean;
    formatter?: (value: any) => string | number;
    propertyGridCell?: IPropertyGridComponent;
    columns?: any[];
  }) {
    super(options);
    this.propertyGridCell = options?.propertyGridCell;
    this.columns = options?.columns?.map((x) => new PropertyGridRow(x)) ?? [];
  }
}
