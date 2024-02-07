'use client';

import { AbcDropdownServerOnly } from 'abc-web-components-react-wrapper';
import { WithRSCFallback } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { DropdownClientOnly } from './dropdown-client-only';

type Props = ComponentProps<typeof WithRSCFallback> & ComponentProps<typeof AbcDropdownServerOnly>;

export const DropdownWithRSC: FC<Props> = ({ rsc, text, hint, label }) => (
  <WithRSCFallback rsc={rsc}>
    <DropdownClientOnly text={text} hint={hint} label={label} />
  </WithRSCFallback>
);
