import { TabType } from './model/tabType';

interface HighlightType {
  offset: number;
  width: number;
}

export function useHighlight(
  tabsRef: HTMLUListElement | null,
  selectedKey: TabType['key'],
): HighlightType | null {
  if (!tabsRef) {
    return null;
  }

  const tabs = Array.from(tabsRef.querySelectorAll('li'));
  const currentTabWidth =
    tabs.find(({ dataset }) => dataset.key === selectedKey)?.offsetWidth || 0;
  let offsetWidth = 0;
  for (const currentTab of tabs) {
    if (currentTab.dataset.key === selectedKey) {
      break;
    }
    offsetWidth += currentTab.offsetWidth;
  }

  return {
    offset: offsetWidth,
    width: currentTabWidth,
  };
}
