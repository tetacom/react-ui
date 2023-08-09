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

const DEFAULT_THEME = 'baselight';

const DefaultStory = () => (
  <Provider localStorageKey="sb" defaultTheme={DEFAULT_THEME}>
    <Content />
  </Provider>
);

const Content = () => {
  const { changeTheme } = useContext(Context);

  return (
    <Stack direction="column" align="start">
      <Typography.Title fontVariant="h4" resetMargin>
        Check theme
      </Typography.Title>

      <Select<BaseSelectProps>
        value={{ key: DEFAULT_THEME, headline: 'Base Light' }}
        items={[
          { key: DEFAULT_THEME, headline: 'Base Light' },
          { key: 'basedark', headline: 'Base Dark' },
          { key: 'tatneftlight', headline: 'Tatneft Light' },
          { key: 'tatneftdark', headline: 'Tatneft Dark' },
        ]}
        onChangeItem={(item) => {
          changeTheme(item.key);
        }}
      />

      <Button>Пример компонента</Button>
    </Stack>
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};
