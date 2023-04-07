import React, { FC } from 'react';

import { TmpSvgIcon } from '../tmpSvgIcon';
import { Button } from '../Button';

export const ButtonStory: FC = () => (
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
);
