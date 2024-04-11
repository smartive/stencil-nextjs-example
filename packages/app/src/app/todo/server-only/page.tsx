import { AbcTodoInputServerOnly, AbcTodoItemServerOnly, WithSSR } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { Input } from './input';
import { TodoItems } from './todo-items';
import { TodoProvider } from './use-todo';

const list = [
  { text: 'my initial todo', checked: false },
  { text: 'Learn about Web Components', checked: true },
];

const Page: FC = () => (
  <TodoProvider todos={list}>
    <h1>Todos Stencil</h1>
    <section>
      <WithSSR fallback={<AbcTodoInputServerOnly />}>
        <Input />
      </WithSSR>
      <ul id="list-container">
        <WithSSR
          fallback={list.map((props, index) => (
            <AbcTodoItemServerOnly key={index} {...props} index={index} />
          ))}
        >
          <TodoItems />
        </WithSSR>
      </ul>
    </section>
  </TodoProvider>
);

export default Page;
