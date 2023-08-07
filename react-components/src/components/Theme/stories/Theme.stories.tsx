import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '../index';
import { useContext } from 'react';
import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { Stack } from '../../Stack';
import { Select } from '../../Select';
import { BaseSelectProps } from '../../Select/model/base-select-item';

const { Provider, Context } = Theme;

const meta: Meta<typeof Provider> = {
  title: 'Other/Theme',
  component: Provider,
};
export default meta;

type Story = StoryObj<typeof Provider>;

const DefaultStory = () => (
  <Provider>
    <Content />
  </Provider>
);

const Content = () => {
  const { toggleTheme } = useContext(Context);

  return (
    <Stack direction="column" align="start">
      <Typography.Title fontVariant="h4" resetMargin>
        Check theme
      </Typography.Title>

      <Select<BaseSelectProps>
        value={{ key: 'tatneftlight', headline: 'Light' }}
        items={[
          { key: 'baselight', headline: 'Base Light' },
          { key: 'basedark', headline: 'Base Light' },
          { key: 'tatneftlight', headline: 'Tatneft Light' },
          { key: 'tatneftdark', headline: 'Tatneft Dark' },
        ]}
        onChangeItem={(item) => {
          toggleTheme(item.key);
        }}
      />

      <Button>Пример компонента</Button>
    </Stack>
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};
