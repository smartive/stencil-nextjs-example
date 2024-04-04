'use client';

import { AbcList } from 'abc-web-components-react-wrapper';
import { WithRSCFallback } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { ListClientOnly } from './list-client-only';

type Props = ComponentProps<typeof WithRSCFallback> & ComponentProps<typeof AbcList>;

export const ListWithRSC: FC<Props> = ({ rsc, items }) => (
  <WithRSCFallback rsc={rsc}>
    <ListClientOnly items={items} />
  </WithRSCFallback>
);
