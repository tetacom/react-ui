import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '../index';
import s from '../../List/style.module.scss';
import { Typography } from '../../Typography';
import { useRef } from 'react';

const meta: Meta<typeof ContextMenu> = {
  title: 'Data Display/Context Menu',
  component: ContextMenu,
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

const ContextMenuStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <ContextMenu nodeRef={ref}>
        <div className={s.list}>
          <div className={s.item}>
            <Typography.Text fontVariant="body3">Вырезать</Typography.Text>
          </div>
          <div className={s.item}>
            <Typography.Text fontVariant="body3">Вставить</Typography.Text>
          </div>
        </div>
      </ContextMenu>

      <div
        id="context-action"
        ref={ref}
        style={{
          width: 300,
          height: 300,
          border: '1px solid red',
          padding: 'var(--spacing-20)',
        }}
      >
        <Typography.Text fontVariant="body3">
          Нажмите для вызова контекстного меню
        </Typography.Text>
      </div>
    </>
  );
};

export const Default: Story = {
  render: () => <ContextMenuStory />,
};
