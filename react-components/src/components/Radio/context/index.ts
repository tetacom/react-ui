import { RadioValue } from '../model';
import React from 'react';

export interface RadioGroupContextData {
  value: null | RadioValue;
  onChange: (value: RadioValue) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextData>({
  value: null,
  onChange: () => {
    throw new Error('Not implemented');
  },
});

export default RadioGroupContext;
