import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import s from './style.module.scss';

interface Props {
  loading: boolean;
}

export const Loader: FC<Props> = ({ loading }) => (
  <AnimatePresence initial={false}>
    {loading && (
      <motion.span
        className={s.root}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <svg width={14} height={14} viewBox="0 0 14 14">
          <path
            fill="currentColor"
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
      </motion.span>
    )}
  </AnimatePresence>
);
