import { TabType } from './tabType';

export type Direction = 'horizontal' | 'vertical';

export interface TabsProps {
  items: TabType[];
  defaultActiveKey?: TabType['key'];
  activeKey?: TabType['key'];
  onChange?: (activeKey: TabType['key']) => void;
  direction?: Direction;
}
