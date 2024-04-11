import { AbcDropdownServerOnly, WithSSR } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC } from 'react';
import { DropdownClientOnly } from './dropdown-client-only';

type Props = ComponentProps<typeof AbcDropdownServerOnly>;

export const DropdownRSC: FC<Props> = ({ text, hint, label }) => (
  <WithSSR fallback={<AbcDropdownServerOnly text={text} hint={hint} label={label} />}>
    <DropdownClientOnly text={text} hint={hint} label={label} />
  </WithSSR>
);
