import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from '../index';
import { ToastDocs } from '../docs';
import { Button } from '../../Button';
import { FC, useState } from 'react';
import { Typography } from '../../Typography';
import { ToastStateType } from '../model';
import { Icon } from '../../Icons';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    docs: {
      page: ToastDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

interface StoryProps {
  autoHideDuration?: number;
  title: string;
  state?: ToastStateType;
}

const DefaultStory: FC<StoryProps> = ({
  autoHideDuration = 2000,
  title,
  state = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="large"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Открыть тост
      </Button>
      <Toast
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={autoHideDuration}
        title={title}
        state={state}
        extra={[
          <Button key="1">
            <Icon name="3dView" />
            Он не понимает
          </Button>,
          <Button key="2">
            <Icon name="questionFilled" />Я не понимаю
          </Button>,
        ]}
      >
        <Typography.Paragraph fontVariant="body3" resetMargin>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Typography.Paragraph>
      </Toast>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DefaultStory {...args} />,
  args: {
    autoHideDuration: 3000,
    title: 'Здесь некий текст, получается',
    state: 'default',
  },
};
