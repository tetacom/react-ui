import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Button } from '../index';
import { ButtonProps } from '../model';
import { ButtonDocs } from '../docs';
import { Icon } from '../../Icons';

export default {
  title: 'General/Button',
  component: Button,
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
  parameters: {
    docs: {
      page: ButtonDocs,
    },
  },
} as ComponentMeta<(args: ButtonProps) => ReturnType<typeof Button>>;

const Template: ComponentStory<
  (args: ButtonProps) => ReturnType<typeof Button>
> = ({ children, ...args }) => (
  <Button {...args} onClick={action('clicked')}>
    {children}
  </Button>
);

export const Default = Template.bind({});
Default.args = {};

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  size: 'large',
};

export const SecondaryColor = Template.bind({});
SecondaryColor.storyName = 'Color: Secondary';
SecondaryColor.args = {
  view: 'outline',
  size: 'large',
};

export const GhostColor = Template.bind({});
GhostColor.storyName = 'Color: Ghost';
GhostColor.args = {
  view: 'ghost',
  size: 'large',
};

export const BasePalette = Template.bind({});
BasePalette.storyName = 'Palette: None';
BasePalette.args = {
  palette: undefined,
  size: 'large',
};

export const GreenPalette = Template.bind({});
GreenPalette.storyName = 'Palette: Green';
GreenPalette.args = {
  palette: 'green',
  size: 'large',
};

export const YellowPalette = Template.bind({});
YellowPalette.storyName = 'Palette: Yellow';
YellowPalette.args = {
  palette: 'yellow',
  size: 'large',
};

export const RedPalette = Template.bind({});
RedPalette.storyName = 'Palette: Red';
RedPalette.args = {
  palette: 'red',
  size: 'large',
};

export const BrickShape = Template.bind({});
BrickShape.storyName = 'Shape: Brick';
BrickShape.args = {
  shape: 'brick',
  size: 'large',
};

export const RoundShape = Template.bind({});
RoundShape.storyName = 'Shape: Round';
RoundShape.args = {
  shape: 'round',
  size: 'large',
};

export const CircleShape = Template.bind({});
CircleShape.storyName = 'Shape: Circle';
CircleShape.args = {
  shape: 'circle',
  size: 'large',
};
