import { AbcTodoInputServerOnly, AbcTodoItemServerOnly } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { Input } from './input';
import { List } from './list';
import { TodoProvider } from './use-todo';

const list = [
  { text: 'my initial todo', checked: false },
  { text: 'Learn about Web Components', checked: true },
];

const Page: FC = () => (
  <TodoProvider list={list}>
    <h1>Todos Stencil</h1>
    <section>
      <Input rsc={<AbcTodoInputServerOnly />} />
      <ul id="list-container">
        <List
          rsc={list.map((props, index) => (
            <AbcTodoItemServerOnly key={index} {...props} index={index} />
          ))}
        />
      </ul>
    </section>
  </TodoProvider>
);

export default Page;
