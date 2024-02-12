import React, { FC, useRef, useState } from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { DrawerProps } from '../model';
import { Drawer } from '../index';

import drawerClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const DefaultDrawer: FC<Omit<DrawerProps, 'open' | 'onClose'>> = (
  props,
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Открыть боковую панель
      </Button>

      <Drawer
        {...props}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Typography.Title fontVariant="title3" resetMargin>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
          commodi culpa cupiditate debitis deleniti deserunt dignissimos et
          facere fuga iure minima necessitatibus perferendis porro quae quaerat
          quibusdam quisquam, quod quos sed sit, suscipit tempore totam ullam,
          voluptas voluptates? A assumenda at, beatae consectetur debitis
          dignissimos distinctio enim est fuga iste itaque molestiae
          necessitatibus non, nostrum officiis optio praesentium qui quo quos
          saepe sint suscipit tempora unde ut vel velit voluptas voluptate!
          Dolor ducimus impedit iure quam quidem! Assumenda dolorum id
          temporibus ullam voluptatibus. Doloribus esse est eveniet
          exercitationem ipsa numquam reiciendis saepe sequi voluptas! Animi
          beatae blanditiis, commodi consequuntur cupiditate dolore esse est
          explicabo illo nihil odit quae quidem sit tempora velit. Accusantium
          culpa delectus, dicta dolor eligendi fuga incidunt ipsum labore minus
          nulla obcaecati, quia soluta voluptatibus. Aperiam at culpa
          dignissimos, est et eum expedita facere fugit id illum laboriosam
          modi, nesciunt pariatur saepe sed suscipit vitae. Aperiam architecto,
          at blanditiis consequatur explicabo facilis fugit in inventore ipsum
          iste iure laboriosam maxime minus nostrum numquam, optio pariatur
          porro sit veritatis vitae. Architecto aspernatur dolores, doloribus
          enim et expedita iusto labore maxime neque, nostrum reprehenderit
          saepe sunt tempore veniam, veritatis. Adipisci dolorem esse explicabo
          iure numquam odio quaerat quibusdam repellendus? Architecto aspernatur
          dolores, doloribus enim et expedita iusto labore maxime neque, nostrum
          reprehenderit saepe sunt tempore veniam, veritatis. Adipisci dolorem
          esse explicabo iure numquam odio quaerat quibusdam repellendus?
        </Typography.Title>
      </Drawer>
    </>
  );
};

export const DrawerDocs = () => {
  const parentRef = useRef(null);

  return (
    <Unstyled>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Боковая панель
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {drawerClassNames.drawerContent}
      </Paragraph>
      <br />
      <Paragraph>Панель, которая выдвигается от края экрана.</Paragraph>
      <Title level={2} fontVariant="h6">
        Когда использовать
      </Title>
      <Paragraph>
        Боковая панель — это панель, которая обычно накладывается поверх
        страницы и выдвигается сбоку. Она содержит набор информации или
        действий. Поскольку пользователь может взаимодействовать с боковой
        панелью, не покидая текущую страницу, задачи можно выполнять более
        эффективно в том же контексте.
      </Paragraph>
      <ul>
        <Text>
          <li>
            Используйте форму для создания или редактирования набора информации.
          </li>
        </Text>
        <Text>
          <li>
            Обработка подзадач. Когда подзадачи слишком тяжелы для всплывающего
            окна, и мы все еще хотим сохранить подзадачи в контексте основной
            задачи, боковая панель оказывается очень удобным.
          </li>
        </Text>
        <Text>
          <li>Когда одна и та же форма требуется в нескольких местах.</li>
        </Text>
      </ul>

      <div
        ref={parentRef}
        style={{
          margin: 'var(--spacing-24) 0',
          padding: 'var(--spacing-24)',
          position: 'relative',
          border: '3px solid var(--color-primary-30)',
          height: 500,
          width: 800,
        }}
      >
        <DefaultDrawer width={300} parent={parentRef.current} />
      </div>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </Unstyled>
  );
};
