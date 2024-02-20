'use client';

import { AbcTodoItem } from 'abc-web-components-react-wrapper';
import { WithRSCFallback } from 'abc-web-components-react-wrapper/client';
import { ComponentProps, FC } from 'react';
import { useTodo } from './use-todo';

export const List: FC<ComponentProps<typeof WithRSCFallback>> = ({ rsc }) => {
  const { list, setList } = useTodo();

  return (
    <WithRSCFallback rsc={rsc}>
      {list.map(({ checked, text }, index) => {
        const props = { checked, text, index };

        return (
          <AbcTodoItem
            {...props}
            key={index}
            onTodoItemChecked={({ detail }) => {
              const copyList = [...list];
              copyList[detail].checked = !copyList[detail].checked;
              setList(copyList);
            }}
            onTodoItemRemove={({ detail }) => {
              setList([...list.slice(0, detail), ...list.slice(detail + 1)]);
            }}
          />
        );
      })}
    </WithRSCFallback>
  );
};
