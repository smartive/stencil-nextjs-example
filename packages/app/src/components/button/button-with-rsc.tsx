'use client';

import { AbcButton } from 'abc-web-components-react-wrapper';
import { WithRSCFallback } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ComponentProps<typeof WithRSCFallback>>;

export const ButtonWithRSC: FC<Props> = ({ rsc, children }) => (
  <WithRSCFallback rsc={rsc}>
    <AbcButton onClick={(event) => console.info(event)}>{children}</AbcButton>
  </WithRSCFallback>
);
