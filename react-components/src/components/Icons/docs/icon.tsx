import React, { useState, useMemo } from 'react';
import { Unstyled } from '@storybook/blocks';

import { Icon } from '../icon';
import { Typography } from '../../Typography';
import { iconsList } from '../icons-list';
import { Input } from '../../Input';

import s from './style.module.scss';
import iconClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const IconDocs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  const filteredList = useMemo(
    () =>
      iconsList.filter((icon) =>
        icon.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );
  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <Unstyled>
      <div className={s.root}>
        <Title
          level={1}
          fontVariant="h4"
          style={{
            marginBottom: 0,
          }}
        >
          Иконка
        </Title>
        <Paragraph
          fontVariant="caption"
          style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
        >
          {iconClassNames.icon}
        </Paragraph>

        <br />

        <Paragraph>Semantic vector graphics.</Paragraph>

        <Input
          size="large"
          value={searchQuery}
          onChange={handleSearch}
          rightIcon={{ icon: 'closeCircle', onClick: handleClear }}
          style={{ width: '100%' }}
        />

        <div className={s.icons}>
          {filteredList.map((icon) => (
            <div key={icon} className={s.icon}>
              <Icon name={icon} size={24} />
              <Text fontVariant="title2">{icon}</Text>
            </div>
          ))}
        </div>
      </div>
    </Unstyled>
  );
};
