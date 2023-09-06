import { FilterItem } from './filter-item';
import { ICellInstance } from './i-cell-instance';
import { HeadDropdownTabConfig } from './head-dropdown-tab';
import { AggregationType } from './enum/aggregation-type.enum';
import { StringFilterType } from './enum/string-filter-type.enum';
import { ListFilterType } from './enum/list-filter-type.enum';
import { FilterType } from './enum/filter-type.enum';
import { CustomCellComponent } from './cell-component';

export class TableColumn extends FilterItem {
  /**
   * Ширина
   */
  width = 80;
  /**
   * Коэффициент растяжения ячейки
   */
  flex = 1;
  /**
   * Стобец закреплен
   */
  locked: boolean;
  /**
   * Стобец скрыт
   */
  hidden?: boolean;
  /**
   * Название столбца в строке результатов
   */
  override name: string;
  /**
   * Название столбца родителя
   */
  parentName: string | null;
  /**
   * Название поля столбца в словаре
   */
  propertyName?: string;
  /**
   * Название столбца для заголовка таблицы
   */
  override caption: string;
  /**
   * Единицы измерения
   */
  unit: string | null;
  unitMeasureParameterId?: number;
  unitId?: number;
  /**
   * список style классов для шапки таблицы
   */
  headCellClass: string[] | null;
  /**
   * список style классов для ячейки таблицы
   */
  cellClass: string[] | null;
  /**
   * Дополнительные данные, свободное описание, доступны внутри компонета ячейки, можно прокинуть callback например
   */
  data?: any;
  /**
   * Колонка доступна для редактирования
   * TODO func callback
   */
  editable: boolean; // | ((coordinates: ICellInstance<unknown>) => boolean);
  /**
   * Компонент для рендера ячейки
   */
  cellComponent?: CustomCellComponent;
  /**
   * Компонент для рендера заголовка столбца ячейки
   */
  headCellComponent?: any;
  /**
   * Custom head dropdown for column
   */
  headDropdownConfig?: HeadDropdownTabConfig | null;
  /**
   * Дочерние колонки
   */
  override columns: TableColumn[];

  /**
   * Aggregate type
   */
  aggregate: AggregationType;

  /**
   * Значение по умолчанию при создании записи
   */
  defaultValue: any;

  /**
   * Значение по умолчанию при создании записи
   */
  maxValue: number | null;

  /**
   * Значение по умолчанию при создании записи
   */
  minValue: number | null;

  /**
   * Поле обязательно для заполнения
   */
  required: boolean;

  /**
   * Инициализация из анонимного объекта
   */
  constructor(options?: {
    width?: number;
    flex?: number;
    sortOrder?: number;
    locked?: boolean;
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
    editable?: boolean | ((coordinates: ICellInstance<any>) => boolean);
    objectType?: boolean;
    cellComponent?: CustomCellComponent;
    headCellComponent?: any;
    headDropdownConfig?: HeadDropdownTabConfig;
    filterComponent?: any;
    columns?: any[];
    aggregate?: AggregationType;
    defaultValue?: any;
    maxValue?: number;
    minValue?: number;
    required?: boolean;
  }) {
    super(options);
    this.width = options?.width ?? 80;
    this.flex = options?.flex ?? 1;
    this.headCellClass = options?.headCellClass ?? [];
    this.cellClass = options?.cellClass ?? [];
    this.locked = options?.locked ?? false;
    this.hidden = options?.hidden ?? false;
    this.name = options?.name ?? '';
    this.parentName = options?.parentName ?? '';
    this.propertyName = options?.propertyName;
    this.caption = options?.caption ?? '';
    this.unit = options?.unit ?? '';
    this.unitMeasureParameterId = options?.unitMeasureParameterId ?? Date.now();
    this.unitId = options?.unitId ?? Date.now();
    this.data = options?.data;
    this.editable = options?.editable ?? true;
    this.headCellComponent = options?.headCellComponent;
    this.headDropdownConfig = options?.headDropdownConfig ?? null;
    this.cellComponent = options?.cellComponent;
    this.aggregate = options?.aggregate ?? AggregationType.none;
    this.defaultValue = options?.defaultValue;
    this.maxValue = options?.maxValue ?? Number.MAX_VALUE;
    this.minValue = options?.minValue ?? 0;
    this.required = options?.required ?? false;
    this.columns = options?.columns?.map((x) => new TableColumn(x)) ?? [];
  }
}
