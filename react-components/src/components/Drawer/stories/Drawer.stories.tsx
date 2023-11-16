import type { Meta, StoryObj } from '@storybook/react';

import { Drawer } from '../index';
import { DrawerDocs } from '../docs';
import { FC, useState } from 'react';
import { Button } from '../../Button';
import { DrawerProps } from '../model';
import { Typography } from '../../Typography';

const meta: Meta<typeof Drawer> = {
  title: 'Feedback/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: DrawerDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

const DefaultDrawer: FC<Omit<DrawerProps, 'open' | 'onClose'>> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Открыть
      </Button>

      <Drawer
        {...props}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Typography.Title fontVariant="title3" resetMargin>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
          commodi culpa cupiditate debitis deleniti deserunt dignissimos et
          facere fuga iure minima necessitatibus perferendis porro quae quaerat
          quibusdam quisquam, quod quos sed sit, suscipit tempore totam ullam,
          voluptas voluptates? A assumenda at, beatae consectetur debitis
          dignissimos distinctio enim est fuga iste itaque molestiae
          necessitatibus non, nostrum officiis optio praesentium qui quo quos
          saepe sint suscipit tempora unde ut vel velit voluptas voluptate!
          Dolor ducimus impedit iure quam quidem! Assumenda dolorum id
          temporibus ullam voluptatibus. Doloribus esse est eveniet
          exercitationem ipsa numquam reiciendis saepe sequi voluptas! Animi
          beatae blanditiis, commodi consequuntur cupiditate dolore esse est
          explicabo illo nihil odit quae quidem sit tempora velit. Accusantium
          culpa delectus, dicta dolor eligendi fuga incidunt ipsum labore minus
          nulla obcaecati, quia soluta voluptatibus. Aperiam at culpa
          dignissimos, est et eum expedita facere fugit id illum laboriosam
          modi, nesciunt pariatur saepe sed suscipit vitae. Aperiam architecto,
          at blanditiis consequatur explicabo facilis fugit in inventore ipsum
          iste iure laboriosam maxime minus nostrum numquam, optio pariatur
          porro sit veritatis vitae. Architecto aspernatur dolores, doloribus
          enim et expedita iusto labore maxime neque, nostrum reprehenderit
          saepe sunt tempore veniam, veritatis. Adipisci dolorem esse explicabo
          iure numquam odio quaerat quibusdam repellendus? Architecto aspernatur
          dolores, doloribus enim et expedita iusto labore maxime neque, nostrum
          reprehenderit saepe sunt tempore veniam, veritatis. Adipisci dolorem
          esse explicabo iure numquam odio quaerat quibusdam repellendus?
        </Typography.Title>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: ({ ...args }) => <DefaultDrawer {...args} />,
  args: {
    placement: 'right',
    title: 'Заголовок',
    extra: [<Button key="1">Test1</Button>, <Button key="2">Test2</Button>],
    width: 300,
    height: 200,
  },
};
