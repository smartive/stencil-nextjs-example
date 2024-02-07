'use client';

import { AbcDropdown, AbcFlyout, AbcFlyoutItem } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC } from 'react';
import { data } from './data';

type Props = ComponentProps<typeof AbcDropdown>;

export const DropdownClientOnly: FC<Props> = ({ text, hint, label }) => (
  <AbcDropdown text={text} hint={hint} label={label} onDropdownChange={(event) => console.info(event.detail)}>
    <AbcFlyout>
      {data.map(({ item, label }) => (
        <AbcFlyoutItem key={item} item={item} label={label} />
      ))}
    </AbcFlyout>
  </AbcDropdown>
);
