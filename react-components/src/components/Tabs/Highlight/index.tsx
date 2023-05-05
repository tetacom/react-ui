import React, { FC } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { TabType } from '../model/tabType';

import s from './style.module.scss';

interface Props {
  tabsRef: HTMLUListElement | null;
  selectedKey: TabType['key'];
  disabled: boolean;
}

export const Highlight: FC<Props> = ({ tabsRef, selectedKey, disabled }) => {
  if (!tabsRef) {
    return null;
  }

  const tabs = Array.from(tabsRef.querySelectorAll('button'));
  const currentTabWidth =
    tabs.find(({ dataset }) => dataset.key === selectedKey)?.offsetWidth || 0;
  let offsetWidth = 0;
  for (const currentTab of tabs) {
    if (currentTab.dataset.key === selectedKey) {
      break;
    }
    offsetWidth += currentTab.offsetWidth;
  }

  return (
    <motion.div
      initial={false}
      className={classNames(s.highlight, disabled && s.highlightDisabled)}
      animate={{ x: offsetWidth, width: currentTabWidth }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
    />
  );
};
