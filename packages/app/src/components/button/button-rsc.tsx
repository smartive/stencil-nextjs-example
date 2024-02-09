import { AbcButtonServerOnly } from 'react-web-components-test';
import { FC, PropsWithChildren } from 'react';
import { ButtonWithRSC } from './button-with-rsc';

export const ButtonRSC: FC<PropsWithChildren> = ({ children }) => (
  <ButtonWithRSC rsc={<AbcButtonServerOnly>{children}</AbcButtonServerOnly>}>{children}</ButtonWithRSC>
);
