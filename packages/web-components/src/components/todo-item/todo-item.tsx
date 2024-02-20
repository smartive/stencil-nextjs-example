import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'abc-todo-item',
  styleUrl: 'todo-item.css',
  shadow: true,
})
export class TodoItem {
  @Prop()
  checked: boolean;

  @Prop()
  text: string;

  @Prop()
  index: number;

  @Event()
  todoItemChecked: EventEmitter<number>;

  @Event()
  todoItemRemove: EventEmitter<number>;

  private handleOnRemove = () => {
    this.todoItemRemove.emit(this.index);
  };

  private handleOnChecked = () => {
    this.todoItemChecked.emit(this.index);
  };

  render() {
    return (
      <li class={this.checked ? 'completed' : ''}>
        <input type="checkbox" checked={this.checked} onChange={this.handleOnChecked} />
        <label>{this.text}</label>
        <button onClick={this.handleOnRemove}>x</button>
      </li>
    ) as JSX.Element;
  }
}
