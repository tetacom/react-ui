import { RadioValueType } from '../model';
import React from 'react';

export interface RadioGroupContextData {
  value: null | RadioValueType;
  onChange: (value: RadioValueType) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextData>({
  value: null,
  onChange: () => {
    throw new Error('Not implemented');
  },
});

export default RadioGroupContext;
