import { render } from '@testing-library/react';

import GanttRow from './GanttRow';

describe('GanttRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GanttRow />);
    expect(baseElement).toBeTruthy();
  });
});
