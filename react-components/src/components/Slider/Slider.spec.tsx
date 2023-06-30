import { render } from '@testing-library/react';

import Index from './context';

describe('Slider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
