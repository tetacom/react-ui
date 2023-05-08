import React, { FC, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import { TabsProps } from './model';
import { TabType } from './model/tabType';
import { Typography } from '../Typography';
import { Highlight } from './Highlight';

import s from './style.module.scss';

export const Tabs: FC<TabsProps> = ({
  items,
  defaultActiveKey = '',
  activeKey = '',
  onChange = null,
  direction = 'top',
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
  const isDisabledSelectedKey =
    items.find((item) => item.key === selectedKey)?.disabled || false;

  const initContent = direction === 'top' ? { x: 0, y: 25 } : { x: 25, y: 0 };
  const animateContent = direction === 'top' ? { x: 0, y: 0 } : { x: 0, y: 0 };

  return (
    <div className={classNames(s.tabs, direction === 'left' && s.tabsLeft)}>
      <ul ref={tabsRef} className={s.nav}>
        {items.map(({ key, label, disabled }) => (
          <li key={key} className={s.navItem}>
            <button
              type="button"
              className={classNames(
                s.navItemButton,
                key === selectedKey && s.navItemButtonSelected,
              )}
              data-key={key}
              disabled={disabled}
              onClick={() => handleChange(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className={s.highlightContainer}>
        <Highlight
          tabsRef={tabsRef.current}
          selectedKey={selectedKey}
          direction={direction}
          disabled={isDisabledSelectedKey}
        />
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
              initial={{ ...initContent, opacity: 0 }}
              animate={{ ...animateContent, opacity: 1 }}
            >
              {result}
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
};
