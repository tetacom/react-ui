import React, { FC, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { TabsProps } from './model';
import { TabType } from './model/tabType';
import { Typography } from '../Typography';
import { useHighlight } from './useHighlight';

import s from './style.module.scss';

export const Tabs: FC<TabsProps> = ({
  items,
  defaultActiveKey = '',
  activeKey = '',
  onChange = null,
  // tabPosition = 'top',
}) => {
  const tabsRef = useRef<HTMLUListElement>(null);
  const [currentKey, setCurrentKey] = useState(defaultActiveKey);

  const handleChange = (clickedKey: TabType['key']) => {
    defaultActiveKey && setCurrentKey(clickedKey);

    onChange && onChange(clickedKey);
  };

  const [isComponentInit, setIsComponentInit] = useState(false);
  useEffect(() => {
    setIsComponentInit(true);
  }, []);

  const selectedKey = activeKey || currentKey;
  const highlight = useHighlight(tabsRef.current, selectedKey);

  return (
    <div className={s.tabs}>
      <ul ref={tabsRef} className={s.nav}>
        {items.map(({ key, label }) => (
          <li
            key={key}
            data-key={key}
            className={classNames(s.navItem)}
            onClick={() => handleChange(key)}
          >
            {label}
          </li>
        ))}
      </ul>

      <div className={s.highlightContainer}>
        {highlight && (
          <motion.div
            initial={false}
            className={s.highlight}
            animate={{ x: highlight.offset, width: highlight.width }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
          />
        )}
      </div>

      {items.map(({ key, children }) => {
        if (!children) return null;
        if (selectedKey !== key) return null;

        const result =
          typeof children === 'string' ? (
            <Typography.Paragraph key={key} className={s.content}>
              {children}
            </Typography.Paragraph>
          ) : (
            children
          );

        return (
          <AnimatePresence key={key} initial={isComponentInit}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {result}
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
};
