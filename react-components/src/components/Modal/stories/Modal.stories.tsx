import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from '../index';
import { ModalDocs } from '../docs';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import { Input } from '../../Input';
import { Stack } from '../../Stack';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: ModalDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

const ModalStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>

      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Заголовок"
      >
        <Stack size={16} direction="column" align="start" block>
          <Typography.Text fontVariant="body3">
            Внимание! Объект будет удален без возможности восстановления
          </Typography.Text>

          <Input.Text placeholder="Text" style={{ width: '100%' }} />
        </Stack>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalStory />,
};
