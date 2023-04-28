import React, { FC, PropsWithChildren, useMemo, useState } from 'react';

import { RadioValueType } from '../model';
import RadioGroupContext, { RadioGroupContextData } from './index';

interface RadioGroupContextProviderProps extends PropsWithChildren {
  initValue: RadioValueType;
  onChangeValue: (checked: RadioValueType) => void;
}

const RadioGroupContextProvider: FC<RadioGroupContextProviderProps> = ({
  initValue,
  onChangeValue,
  children,
}) => {
  const [value, setValue] = useState<RadioValueType>(initValue);

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
