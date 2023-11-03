'use client';

import { AbcButton } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC } from 'react';

export const Button: FC = () => (
  <AbcWrapper>
    <AbcButton variant="secondary" size="md" as="button" onClick={(event) => console.info(event)}>
      Button
    </AbcButton>
  </AbcWrapper>
);
