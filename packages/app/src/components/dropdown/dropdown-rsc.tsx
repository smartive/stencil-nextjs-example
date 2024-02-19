import { AbcDropdownServerOnly } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC } from 'react';
import { DropdownWithRSC } from './dropdown-with-rsc';

type Props = ComponentProps<typeof AbcDropdownServerOnly>;

export const DropdownRSC: FC<Props> = ({ text, hint, label }) => (
  <DropdownWithRSC
    rsc={<AbcDropdownServerOnly text={text} hint={hint} label={label} />}
    text={text}
    hint={hint}
    label={label}
  />
);
