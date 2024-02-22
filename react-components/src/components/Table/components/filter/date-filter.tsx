import React, { FC } from 'react';

import { Input } from '../../../Input';
import { Icon } from '../../../Icons';

import s from './style.module.scss';

interface Props {
  dates: [string, string];
  onChange: (values: [string, string]) => void;
}

export const DateFilter: FC<Props> = ({ dates, onChange }) => {
  const [from = '', to = ''] = dates;

  return (
    <div className={s.interval}>
      <Input.Text
        placeholder=""
        type="date"
        value={from}
        onChange={(value) => {
          onChange([value, to]);
        }}
        rightIcons={[
          <Icon
            key="clear"
            name="closeBig"
            onClick={() => {
              onChange(['', to]);
            }}
          />,
        ]}
      />
      -
      <Input.Text
        placeholder=""
        type="date"
        value={to}
        onChange={(value) => {
          onChange([from, value]);
        }}
        rightIcons={[
          <Icon
            key="clear"
            name="closeBig"
            onClick={() => {
              onChange([from, '']);
            }}
          />,
        ]}
      />
    </div>
  );
};
