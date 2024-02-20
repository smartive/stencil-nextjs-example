'use client';

import { AbcTodoInput, AbcTodoItem } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC, useState } from 'react';

type TodoItem = { text: string; checked: boolean };
const INITIAL_TODOS: TodoItem[] = [
  { text: 'my initial todo', checked: false },
  { text: 'Learn about Web Components', checked: true },
];

const Page: FC = () => {
  const [list, setList] = useState<TodoItem[]>(INITIAL_TODOS);

  return (
    <AbcWrapper>
      <h1>Todos Stencil</h1>
      <section>
        <AbcTodoInput
          onTodoInputSubmit={({ detail }) => {
            setList([...list, { text: detail, checked: false }]);
          }}
        />
        <ul id="list-container">
          {list.map(({ checked, text }, index) => (
            <AbcTodoItem
              key={index}
              checked={checked}
              text={text}
              index={index}
              onTodoItemChecked={({ detail }) => {
                const copyList = [...list];
                copyList[detail].checked = !copyList[detail].checked;
                setList(copyList);
              }}
              onTodoItemRemove={({ detail }) => {
                setList([...list.slice(0, detail), ...list.slice(detail + 1)]);
              }}
            />
          ))}
        </ul>
      </section>
    </AbcWrapper>
  );
};

export default Page;
