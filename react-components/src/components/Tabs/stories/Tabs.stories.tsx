import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '../index';
import { TabType } from '../model/tabType';
import { Button } from '../../Button';
import { TabsDocs } from '../docs';
import { Icon } from '../../Icons';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: TabsDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs
      defaultActiveKey="2"
      size="small"
      items={[
        {
          key: '1',
          label: <>Это просто таб</>,
          children: `Content of Tab Pane 1`,
        },
        {
          key: '2',
          label: (
            <>
              <Icon name="add" /> Это просто таб
            </>
          ),
          children: `Content of Tab Pane 2`,
        },
        {
          key: '3',
          label: <Icon name="add" />,
          children: `Content of Tab Pane 3`,
        },
        {
          key: '4',
          label: <>Неактивный таб</>,
          children: `Content of Tab Pane 4`,
          disabled: true,
        },
      ]}
    />
  ),
};

const TabsWithHooks = () => {
  const [activeKey, setActiveKey] = useState('1');
  const onChange = (selectedKey: TabType['key']) => {
    setActiveKey(selectedKey);
  };

  return (
    <Tabs
      activeKey={activeKey}
      onChange={onChange}
      direction="vertical"
      items={[
        {
          key: '1',
          label: (
            <>
              <Icon name="add" /> Это просто таб
            </>
          ),
          children: `Content of Tab Pane 1`,
        },
        {
          key: '2',
          label: (
            <>
              <Icon name="add" /> Это просто таб
            </>
          ),
          children: <Button>Button</Button>,
        },
        {
          key: '3',
          label: (
            <>
              <Icon name="add" /> Это просто таб
            </>
          ),
          children: `Content of Tab Pane 3`,
        },
      ]}
    />
  );
};
export const ControlledTabs: Story = {
  render: () => <TabsWithHooks />,
};

export const Links: Story = {
  render: () => (
    <Tabs
      items={[
        {
          key: '1',
          label: <a href="http://www.google.com/">Google</a>,
        },
        {
          key: '2',
          label: <a href="http://www.yandex.com/">Yandex</a>,
        },
        {
          key: '3',
          label: <a href="https://www.bing.com/">Bing</a>,
        },
      ]}
    />
  ),
};
