import React, { FC, PropsWithChildren, useMemo, useState } from 'react';

import { RadioValue } from '../model';
import RadioGroupContext, { RadioGroupContextData } from './index';

interface RadioGroupContextProviderProps extends PropsWithChildren {
  initValue: RadioValue;
  onChangeValue: (checked: RadioValue) => void;
}

const RadioGroupContextProvider: FC<RadioGroupContextProviderProps> = ({
  initValue,
  onChangeValue,
  children,
}) => {
  const [value, setValue] = useState<RadioValue>(initValue);

  const radioGroupContextValue: RadioGroupContextData = useMemo(
    () => ({
      value,
      onChange: (changedValue) => {
        setValue(changedValue);
        onChangeValue(changedValue);
      },
    }),
    [value, onChangeValue],
  );

  return (
    <RadioGroupContext.Provider value={radioGroupContextValue}>
      {children}
    </RadioGroupContext.Provider>
  );
};

export default RadioGroupContextProvider;
