import { TabType } from './tabType';

type Direction = 'top' | 'left';

export interface TabsProps {
  items: TabType[];
  defaultActiveKey?: TabType['key'];
  activeKey?: TabType['key'];
  onChange?: (activeKey: TabType['key']) => void;
  direction?: Direction;
}
