'use client';

import { AbcButton } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC, useEffect, useRef } from 'react';

export const Button: FC = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const { current } = ref;
    const onClick = (event: Event) => console.log((event as CustomEvent<string>)['detail']);
    current?.addEventListener('click', onClick);

    return () => current?.removeEventListener('click', onClick);
  }, [ref]);

  return (
    <AbcWrapper>
      <AbcButton variant="secondary" size="md" as="button" ref={ref}>
        Button
      </AbcButton>
    </AbcWrapper>
  );
};
