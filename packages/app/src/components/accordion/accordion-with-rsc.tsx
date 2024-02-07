'use client';

import { WithRSCFallback } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { AccordionClientOnly } from './accordion-client-only';

export const AccordionWithRSC: FC<ComponentProps<typeof WithRSCFallback>> = ({ rsc }) => (
  <WithRSCFallback rsc={rsc}>
    <AccordionClientOnly />
  </WithRSCFallback>
);
