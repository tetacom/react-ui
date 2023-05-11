import { TabType } from './tabType';

type Direction = 'top' | 'left';

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
}
