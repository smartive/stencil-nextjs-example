'use client';

import { AbcTodoInput } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { useTodo } from './use-todo';

export const Input: FC = () => {
  const { todos, setTodos } = useTodo();

  return <AbcTodoInput onTodoInputSubmit={({ detail }) => setTodos([...todos, { text: detail, checked: false }])} />;
};
