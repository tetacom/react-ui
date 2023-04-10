import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Button, ButtonProps } from '../Button';
import ButtonDocs from '../Button/docs';
import { TmpSvgIcon } from '../tmpSvgIcon';

export default {
  title: 'Buttons/Button',
  component: Button,
  args: {
    children: 'Push me',
    view: 'primary',
    size: 'middle',
    palette: undefined,
    brick: 'round',
    icons: [<TmpSvgIcon />, <TmpSvgIcon />],
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

// export const PrimaryColor = Template.bind({});
// PrimaryColor.storyName = 'Color: Primary';
// PrimaryColor.args = {
//   palette: 'yellow',
// };
