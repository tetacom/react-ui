import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../index';
import { Icon } from '../../Icons';
import { ButtonDocs } from '../docs';
import { Typography } from '../../Typography';

const { Paragraph, Text } = Typography;

const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
  parameters: {
    docs: {
      page: ButtonDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Icon name="update" />
        Push me
        <Icon name="user" />
      </>
    ),
    view: 'primary',
    size: 'middle',
    palette: undefined,
    shape: 'round',
    disabled: false,
    square: false,
    block: false,
    loading: false,
  },
};

export const Secondary: Story = {
  name: 'Color: Secondary',
  args: {
    ...Default.args,
    view: 'outline',
  },
};

export const Ghost: Story = {
  name: 'Color: Ghost',
  args: {
    ...Default.args,
    view: 'ghost',
  },
};

export const PaletteNone: Story = {
  name: 'Palette: None',
  args: {
    ...Default.args,
  },
};

export const PaletteGreen: Story = {
  name: 'Palette: Green',
  args: {
    ...Default.args,
    palette: 'green',
  },
};

export const PaletteYellow: Story = {
  name: 'Palette: Yellow',
  args: {
    ...Default.args,
    palette: 'yellow',
  },
};

export const PaletteRed: Story = {
  name: 'Palette: Red',
  args: {
    ...Default.args,
    palette: 'red',
  },
};

export const ShapeBrick: Story = {
  name: 'Shape: Brick',
  args: {
    ...Default.args,
    shape: 'brick',
  },
};

export const ShapeRound: Story = {
  name: 'Shape: Round',
  args: {
    ...Default.args,
    shape: 'round',
  },
};

export const ShapeCircle: Story = {
  name: 'Shape: Circle',
  args: {
    ...Default.args,
    shape: 'circle',
  },
};

const FileButton = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (uploadFile: File) => {
    setFile(uploadFile);
  };

  return (
    <div>
      <Button
        file={{
          acceptList: ['xls', 'xlsx', 'png', 'jpeg', 'jpg', 'svg'],
          onChange: handleChange,
          errorCallback: () => {
            console.log('Error callback');
          },
        }}
      >
        Загрузить файл
      </Button>

      {file && (
        <Paragraph>
          Uploaded file: <Text fontVariant="title2">{file.name}</Text>
        </Paragraph>
      )}
    </div>
  );
};

export const FileButtonStory: Story = {
  name: 'File',
  render: () => <FileButton />,
};
