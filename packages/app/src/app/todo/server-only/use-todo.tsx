'use client';

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type TodoItem = { text: string; checked: boolean };

const TodoContext = createContext({} as { list: TodoItem[]; setList: (list: TodoItem[]) => void });

export const TodoProvider: FC<PropsWithChildren<{ list: TodoItem[] }>> = ({ children, list: initialList }) => {
  const [list, setList] = useState(initialList);

  return <TodoContext.Provider value={{ list, setList }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context.list) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
