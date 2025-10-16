import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { List } from '../index';
import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { Icon } from '../../Icons';
import { Dropdown } from '../../Dropdown';

import listClassNames from '../style.module.scss';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';

const { Title, Paragraph, Text } = Typography;

export const ListDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      List Item
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {listClassNames.list}
    </Paragraph>

    <br />

    <Paragraph>
      List Item — элемент списка, позволяющий сгруппировать похожие элементы.
      Например, элементы меню, которые появляются при нажатии на кнопку,
      создаются из list item.
    </Paragraph>
    <Paragraph>
      В правой панели Figma указаны все возможные настройки, при включении и
      отключении тогглов будут добавляться/скрываться пункты настроек
    </Paragraph>

    <Paragraph>Обязательные элементы для List Item:</Paragraph>
    <ul>
      <Text>
        <li>Headline - главный текст в элементе списка,</li>
      </Text>
      <Text>
        <li>
          Devider - разделительная линия, можно скрыть если состояние не Rest
        </li>
      </Text>
    </ul>

    <Paragraph>Опциональные элементы для List Item:</Paragraph>
    <ul>
      <Text>
        <li>Картинка размером 28 и 44 px со скруглением или без</li>
      </Text>
      <Text>
        <li>Checkbox</li>
      </Text>
      <Text>
        <li>
          1 иконку слева и до 2 иконок справа, иконки можно заменить через
          свойство Swap (L/R1\R2) Icon
        </li>
      </Text>
      <Text>
        <li>
          Вспомогательный текст (Caption) с небольшим кеглем под главным
          текстом, он необходим для отображения дополнительной информации
        </li>
      </Text>
    </ul>

    <Title level={2} fontVariant="h6">
      Как использовать
    </Title>
    <Paragraph>Список меню</Paragraph>
    <Paragraph>
      В таком случае требуется собрать все list item в auto layout с отступом 8
      px сверху и снизу, боковые отступы 0.
    </Paragraph>
    <Paragraph>
      Наложить Effect Style с названием “2” в зависимости от темы в которой
      создается макет.
    </Paragraph>

    <div style={{ margin: '24px 0' }}>
      <Dropdown
        placement="bottom-start"
        dropdown={
          <List
            divider={false}
            items={[
              {
                keyValue: '1',
                headline: 'Item 1',
              },
              {
                keyValue: '2',
                headline: 'Item 2',
              },
              {
                keyValue: '3',
                headline: 'Item 3',
              },
            ]}
          />
        }
      >
        <Button square view="outline">
          <Icon name="moreVertical" />
        </Button>
      </Dropdown>
    </div>

    <Paragraph>
      Список сущностей, например список людей с отображением ФИО, аватара и
      должностью под ФИО
    </Paragraph>

    <div style={{ margin: '24px 0' }}>
      <List
        imageSize="large"
        imageRound={false}
        items={[
          {
            keyValue: '1',
            headline: 'Савельева Эмилия Арсентьевна',
            caption: 'Главный',
            picture: img1,
          },
          {
            keyValue: '2',
            headline: 'Бабушкин Олег Ростиславович',
            caption: 'По горшкам',
            picture: img2,
          },
          {
            keyValue: '3',
            headline: 'Петрова Милана Михайловна',
            caption: 'Командный',
            picture: img3,
          },
        ]}
      />
    </div>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
