import React, { forwardRef } from 'react';

import { CheckboxGroup } from './components/checkbox-group';
import { CheckboxComponent } from './components/checkbox';

import { CheckboxProps, CheckboxRef } from './model';

interface CheckboxComposition
  extends React.ForwardRefExoticComponent<CheckboxProps | CheckboxRef> {
  Group: typeof CheckboxGroup;
}

const forwardedRef = forwardRef<CheckboxRef, CheckboxProps>(
  (props, ref): React.ReactElement => {
    return <CheckboxComponent {...props} ref={ref} />;
  },
);

export const Checkbox = {
  ...forwardedRef,
  Group: CheckboxGroup,
} as CheckboxComposition;
