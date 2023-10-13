'use client';

import { AbcDropdown, AbcFlyout, AbcFlyoutItem } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC, useEffect, useRef } from 'react';

export const Dropdown: FC = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const { current } = ref;
    const onDropdownChange = (event: Event) => console.log((event as CustomEvent<string>)['detail']);
    current?.addEventListener('dropdownChange', onDropdownChange);

    return () => current?.removeEventListener('dropdownChange', onDropdownChange);
  }, [ref]);

  return (
    <AbcWrapper>
      <AbcDropdown text="Dropdown" hint="Hint" label="Label" ref={ref}>
        <AbcFlyout>
          <AbcFlyoutItem item="item-1" label="Item 1" />
          <AbcFlyoutItem item="item-2" label="Item 2" />
          <AbcFlyoutItem item="item-3" label="Item 3" />
          <AbcFlyoutItem item="item-4" label="Item 4" />
        </AbcFlyout>
      </AbcDropdown>
    </AbcWrapper>
  );
};
