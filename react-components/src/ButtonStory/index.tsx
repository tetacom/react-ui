import React, { FC } from 'react';

import { TmpSvgIcon } from '../tmpSvgIcon';
import { Button } from '../Button';

import s from './style.module.scss';

interface Props {
  square?: boolean;
}

export const ButtonStory: FC<Props> = ({ square = false }) => (
  <div className={s.root}>
    <p>State \ View</p>
    <p>Primary</p>
    <p>Secondary</p>
    <p>Ghost</p>

    <p>Default</p>
    <div>
      <Button square={square} icons={[<TmpSvgIcon />, <TmpSvgIcon />]}>
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>

    <p>Green</p>
    <div>
      <Button
        square={square}
        palette="green"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        palette="green"
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        palette="green"
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>

    <p>Yellow</p>
    <div>
      <Button
        square={square}
        palette="yellow"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        palette="yellow"
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        palette="yellow"
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>

    <p>Red</p>
    <div>
      <Button
        square={square}
        palette="red"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        palette="red"
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        palette="red"
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>

    <p>Disabled</p>
    <div>
      <Button square={square} disabled icons={[<TmpSvgIcon />, <TmpSvgIcon />]}>
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        disabled
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        disabled
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>

    <p>Loading</p>
    <div>
      <Button square={square} loading icons={[<TmpSvgIcon />, <TmpSvgIcon />]}>
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        loading
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        loading
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>

    <p>Block</p>
    <div>
      <Button square={square} block icons={[<TmpSvgIcon />, <TmpSvgIcon />]}>
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        block
        view="outline"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
    <div>
      <Button
        square={square}
        block
        view="ghost"
        icons={[<TmpSvgIcon />, <TmpSvgIcon />]}
      >
        Button
      </Button>
    </div>
  </div>
);
