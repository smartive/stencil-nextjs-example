'use client';

import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { DropdownClientOnly } from './dropdown-client-only';
import { AbcDropdownServerOnly } from 'abc-web-components-react-wrapper';

type Props = ComponentProps<typeof AbcDropdownServerOnly>;

export const DropdownWithWrapper: FC<Props> = ({ text, hint, label }) => (
  <AbcWrapper>
    <DropdownClientOnly text={text} hint={hint} label={label} />
  </AbcWrapper>
);
