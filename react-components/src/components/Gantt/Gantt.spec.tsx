import { render } from '@testing-library/react';

import { Gantt } from './index';

describe('Gantt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Gantt />);
    expect(baseElement).toBeTruthy();
  });
});
