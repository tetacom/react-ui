import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Typography } from '../../Typography';

import tableClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const TableDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Таблица
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {tableClassNames.table}
    </Paragraph>

    <br />

    <Paragraph>
      Table (таблица) — компонент, который отображает данные. Создает на основе
      двух элементов: Table Header (шапка таблицы) и Cell (ячейка).
    </Paragraph>

    <Title level={2} fontVariant="h6">
      Как использовать
    </Title>
    <Paragraph>Основные правила применения элементов таблицы:</Paragraph>
    <ul>
      <Text>
        <li>
          в ячейке могут быть иконки, текстовые составляющие, выпадающие
          таблицы, тоглы, чекбоксы и др.;
        </li>
      </Text>
      <Text>
        <li>Table Header используется только в шапке таблице.</li>
      </Text>
    </ul>
    <Paragraph>
      Для упрощения дизайн-процесса лучше всего создать строку из необходимого
      количества Table Header и объединить в компонент. Затем то же самое
      повторить со строками с Cell и из полученных строк создать компонент
      таблицы.
    </Paragraph>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
