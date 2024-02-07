'use client';

import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC, PropsWithChildren } from 'react';
import { ButtonClientOnly } from './button-client-only';

export const ButtonWithWrapper: FC<PropsWithChildren> = ({ children }) => (
  <AbcWrapper>
    <ButtonClientOnly>{children}</ButtonClientOnly>
  </AbcWrapper>
);
