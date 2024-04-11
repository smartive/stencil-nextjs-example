'use client';

import { AbcTodoItem } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { useTodo } from './use-todo';

export const TodoItems: FC = () => {
  const { todos, setTodos } = useTodo();

  return (
    <>
      {todos.map(({ checked, text }, index) => {
        const props = { checked, text, index };

        return (
          <AbcTodoItem
            {...props}
            key={index}
            onTodoItemChecked={({ detail }) => {
              const copyList = [...todos];
              copyList[detail].checked = !copyList[detail].checked;
              setTodos(copyList);
            }}
            onTodoItemRemove={({ detail }) => {
              setTodos([...todos.slice(0, detail), ...todos.slice(detail + 1)]);
            }}
          />
        );
      })}
    </>
  );
};
