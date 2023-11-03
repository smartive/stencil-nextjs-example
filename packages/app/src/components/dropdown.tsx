'use client';

import { AbcDropdown, AbcFlyout, AbcFlyoutItem } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC } from 'react';

export const Dropdown: FC = () => (
  <AbcWrapper>
    <AbcDropdown text="Dropdown" hint="Hint" label="Label" onDropdownChange={(event) => console.info(event.detail)}>
      <AbcFlyout>
        <AbcFlyoutItem item="item-1" label="Item 1" />
        <AbcFlyoutItem item="item-2" label="Item 2" />
        <AbcFlyoutItem item="item-3" label="Item 3" />
        <AbcFlyoutItem item="item-4" label="Item 4" />
      </AbcFlyout>
    </AbcDropdown>
  </AbcWrapper>
);
