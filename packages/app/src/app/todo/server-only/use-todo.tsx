'use client';

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type TodoItem = { text: string; checked: boolean };

const TodoContext = createContext({} as { todos: TodoItem[]; setTodos: (list: TodoItem[]) => void });

export const TodoProvider: FC<PropsWithChildren<{ todos: TodoItem[] }>> = ({ children, todos: initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);

  return <TodoContext.Provider value={{ todos, setTodos }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context.todos) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
