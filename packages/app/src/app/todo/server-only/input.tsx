'use client';

import { AbcTodoInput } from 'abc-web-components-react-wrapper';
import { WithRSCFallback } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { useTodo } from './use-todo';

export const Input: FC<ComponentProps<typeof WithRSCFallback>> = ({ rsc }) => {
  const { list, setList } = useTodo();

  return (
    <WithRSCFallback rsc={rsc}>
      <AbcTodoInput onTodoInputSubmit={({ detail }) => setList([...list, { text: detail, checked: false }])} />
    </WithRSCFallback>
  );
};
