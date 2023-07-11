import { render } from '@testing-library/react';

import { Gantt } from './index';
import { rigItems } from './stories/Gantt.stories';

describe('Gantt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Gantt items={rigItems} />);
    expect(baseElement).toBeTruthy();
  });
});
