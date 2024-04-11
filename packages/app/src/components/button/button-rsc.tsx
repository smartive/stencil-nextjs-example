import { AbcButtonServerOnly, WithSSR } from 'abc-web-components-react-wrapper';
import { FC, PropsWithChildren } from 'react';
import { ButtonClientOnly } from './button-client-only';

export const ButtonRSC: FC<PropsWithChildren> = ({ children }) => (
  <WithSSR fallback={<AbcButtonServerOnly>{children}</AbcButtonServerOnly>}>
    <ButtonClientOnly>{children}</ButtonClientOnly>
  </WithSSR>
);
