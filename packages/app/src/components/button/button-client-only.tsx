'use client';

import { AbcButton } from 'abc-web-components-react-wrapper';
import { FC, PropsWithChildren } from 'react';

export const ButtonClientOnly: FC<PropsWithChildren> = ({ children }) => (
  <AbcButton variant="primary" size="md" as="button" onClick={(event) => console.info(event)}>
    {children}
  </AbcButton>
);
