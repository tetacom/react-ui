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
  const isDisabledSelectedKey =
    items.find((item) => item.key === selectedKey)?.disabled || false;

  return (
    <div className={s.tabs}>
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
