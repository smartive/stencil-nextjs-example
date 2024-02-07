'use client';

import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC } from 'react';
import { AccordionClientOnly } from './accordion-client-only';

export const AccordionWithWrapper: FC = () => (
  <AbcWrapper>
    <AccordionClientOnly />
  </AbcWrapper>
);
