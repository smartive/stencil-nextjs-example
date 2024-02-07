import { AbcButtonServerOnly } from 'abc-web-components-react-wrapper';
import { FC, PropsWithChildren } from 'react';
import { ButtonWithRSC } from './button-with-rsc';

export const ButtonRSC: FC<PropsWithChildren> = ({ children }) => (
  <ButtonWithRSC rsc={<AbcButtonServerOnly>{children}</AbcButtonServerOnly>}>{children}</ButtonWithRSC>
);
