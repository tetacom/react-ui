import React, { FC } from 'react';

import { SpinnerProps } from './model';

export const Spinner: FC<SpinnerProps> = ({
  color = 'currentColor',
  size = 14,
  ...props
}) => (
  <svg {...props} width={size} height={size} viewBox="0 0 14 14">
    <path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2V0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7H12Z"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 7 7"
        to="360 7 7"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);
