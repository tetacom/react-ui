import { TabType } from './tabType';

export type Direction = 'horizontal' | 'vertical';
export type TabSize = 'small' | 'large';

export interface TabsProps {
  // Настроить содержимое вкладок
  items: TabType[];

  // Ключ исходной активной вкладки, если activeKey не установлен
  defaultActiveKey?: TabType['key'];

  // Ключ текущий вкладки ключ
  activeKey?: TabType['key'];

  // Обратный вызов выполняется при изменении активной вкладки
  onChange?: (activeKey: TabType['key']) => void;

  // Направление вкладок
  direction?: Direction;

  // Размер вкладок
  size?: TabSize;
}
