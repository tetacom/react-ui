import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { TmpSvgIcon } from '../tmpSvgIcon';

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, auto)' }}>
      <div>
        <Button>Button</Button>
        <br />
        <br />
        <Button view="outline">Button</Button>
        <br />
        <br />
        <Button view="ghost">Button</Button>
      </div>
      <div>
        <Button palette="green">Button</Button>
        <br />
        <br />
        <Button palette="green" view="outline">
          Button
        </Button>
        <br />
        <br />
        <Button palette="green" view="ghost">
          Button
        </Button>
      </div>
      <div>
        <Button palette="yellow">Button</Button>
        <br />
        <br />
        <Button palette="yellow" view="outline">
          Button
        </Button>
        <br />
        <br />
        <Button palette="yellow" view="ghost">
          Button
        </Button>
      </div>
      <div>
        <Button palette="red">Button</Button>
        <br />
        <br />
        <Button palette="red" view="outline">
          Button
        </Button>
        <br />
        <br />
        <Button palette="red" view="ghost">
          Button
        </Button>
      </div>
      <div>
        <Button disabled>Button</Button>
        <br />
        <br />
        <Button disabled view="outline">
          Button
        </Button>
        <br />
        <br />
        <Button disabled view="ghost">
          Button
        </Button>
      </div>
      <div>
        <Button loading>Button</Button>
        <br />
        <br />
        <Button loading view="outline">
          Button
        </Button>
        <br />
        <br />
        <Button loading view="ghost">
          Button
        </Button>
      </div>
      <div>
        <Button square>
          <TmpSvgIcon />
        </Button>
        <br />
        <br />
        <Button view="outline" square>
          <TmpSvgIcon />
        </Button>
        <br />
        <br />
        <Button view="ghost" square>
          <TmpSvgIcon />
        </Button>
      </div>
      <div>
        <Button square loading>
          <TmpSvgIcon />
        </Button>
        <br />
        <br />
        <Button view="outline" square loading>
          <TmpSvgIcon />
        </Button>
        <br />
        <br />
        <Button view="ghost" square loading>
          <TmpSvgIcon />
        </Button>
      </div>
    </div>
  ),
};
