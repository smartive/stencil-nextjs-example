import { h, Component, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'abc-todo-input',
  styleUrl: 'todo-input.css',
  shadow: true,
})
export class TodoInput {
  @Event()
  todoInputSubmit: EventEmitter<string>;

  @State()
  value: string;

  private handleOnSubmit = (e: Event) => {
    e.preventDefault();
    if (this.value === '') {
      return;
    }
    this.todoInputSubmit.emit(this.value);
    this.value = '';
  };

  private handleInputChange = (event: InputEvent) => {
    this.value = (event.target as HTMLInputElement).value;
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          id="input-submit"
          value={this.value}
          type="text"
          placeholder="What needs to be done?"
          onInput={this.handleInputChange}
        />
      </form>
    ) as JSX.Element;
  }
}
