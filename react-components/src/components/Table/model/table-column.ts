import { StringUtil } from '../../../utils/strign-util';
import { FilterType } from './enum/filter-type.enum';

export class TableColumn {
  /**
   * Порядковый номер
   */
  sortOrder: number = Number.MAX_VALUE;
  /**
   * Название столбца для заголовка таблицы
   */
  caption: string;
  /**
   * Подсказка
   */
  hint: string;
  /**
   * Название столбца в строке результатов
   */
  name: string;
  /**
   * Возможность сортировать поле
   */
  sortable = true;
  /**
   * Возможность фильтровать поле
   */
  filterable = true;
  /**
   * Поле для сортировки
   */
  sortField: string;
  /**
   * Поле для фильтрации
   */
  filterField: string;
  /**
   * Тип фильтра
   */
  filterType: FilterType | null;

  constructor(options?: {
    sortOrder?: number;
    name?: string;
    caption?: string;
    hint?: string;
    sortable?: boolean;
    sortField?: string;
    filterable?: boolean;
    filterField?: string;
    filterType?: FilterType | null;
  }) {
    this.sortOrder = options?.sortOrder ?? Number.MAX_VALUE;
    this.name = options?.name ?? '';
    this.caption = options?.caption ?? this.name;
    this.hint = options?.hint ?? '';
    this.sortable = options?.sortable ?? true;
    this.filterable = options?.filterable ?? true;
    this.sortField = StringUtil.firstLetterToLower(
      options?.sortField ?? this.name,
    );
    this.filterField = StringUtil.firstLetterToLower(
      options?.filterField ?? this.name,
    );
    this.filterType = options?.filterType || null;
  }
}
