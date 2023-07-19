import React, { FC } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { TabType } from '../../model/tabType';
import { Direction } from '../../model';

import s from './style.module.scss';

const SIZE = 2;

interface Props {
  tabsRef: HTMLUListElement | null;
  selectedKey: TabType['key'];
  direction: Direction;
  disabled: boolean;
}

export const Highlight: FC<Props> = ({
  tabsRef,
  selectedKey,
  direction,
  disabled,
}) => {
  if (!tabsRef) {
    return null;
  }

  const tabs = Array.from(tabsRef.querySelectorAll('button'));
  const selectedTab = tabs.find(({ dataset }) => dataset.key === selectedKey);
  const currentTabWidth = selectedTab?.offsetWidth || 0;
  const currentTabHeight = selectedTab?.offsetHeight || 0;
  let offsetWidth = 0;
  let offsetHeight = 0;
  for (const currentTab of tabs) {
    if (currentTab.dataset.key === selectedKey) {
      break;
    }
    offsetWidth += currentTab.offsetWidth;
    offsetHeight += currentTab.offsetHeight;
  }

  const horizontal = {
    x: offsetWidth,
    y: -1 * SIZE,
    width: currentTabWidth,
    height: SIZE,
  };
  const vertical = {
    x: 0,
    y: offsetHeight,
    width: SIZE,
    height: currentTabHeight,
  };

  return (
    <motion.div
      initial={false}
      className={classNames(s.highlight, disabled && s.highlightDisabled)}
      animate={direction === 'horizontal' ? horizontal : vertical}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
    />
  );
};
