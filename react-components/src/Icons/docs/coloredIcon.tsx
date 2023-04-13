import React, { useState, useMemo } from 'react';

import { ColoredIcon } from '../index';
import { Typography } from '../../Typography';
import { coloredIconsList } from '../icons-list';
import s from './style.module.scss';
import iconClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const ColoredIconDocs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const filteredList = useMemo(
    () => coloredIconsList.filter((icon) => icon.includes(searchQuery)),
    [searchQuery],
  );

  return (
    <div className={s.root}>
      <Title
        level={4}
        style={{
          marginBottom: 0,
        }}
      >
        Цветная иконка
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {iconClassNames.icon}
      </Paragraph>

      <br />

      <Paragraph>Semantic vector graphics.</Paragraph>

      <Title level={6}>
        <input
          type="text"
          placeholder="Icon name"
          autoFocus
          onChange={handleSearch}
          style={{
            width: '100%',
            border: '1px solid var(--color-primary-50)',
            padding: 'var(--spacing-8)',
          }}
        />
      </Title>

      <div className={s.icons}>
        {filteredList.map((icon) => (
          <div key={icon} className={s.icon}>
            <ColoredIcon name={icon} size={24} />
            <Text fontVariant="title2">{icon}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
