'use client';

import { AbcListServerOnly } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { ListClientOnly } from './list-client-only';

type Props = ComponentProps<typeof AbcListServerOnly>;

export const ListWithWrapper: FC<Props> = ({ items }) => (
  <AbcWrapper>
    <ListClientOnly items={items} />
  </AbcWrapper>
);
