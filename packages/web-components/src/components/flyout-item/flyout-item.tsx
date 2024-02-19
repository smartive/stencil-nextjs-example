import { Component, Event, EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'abc-flyout-item',
  styleUrl: 'flyout-item.scss',
  shadow: true,
})
export class FlyoutItem {
  @Event()
  itemClick: EventEmitter<{ item: string; selected: boolean }>;

  @Prop()
  label!: string;

  @Prop({ reflect: true })
  selected = false;

  @Prop({ reflect: true })
  item!: string;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async focusItem() {
    this.buttonEl?.focus();
  }

  private buttonEl?: HTMLButtonElement;

  render() {
    return (
      <button
        ref={(el) => (this.buttonEl = el)}
        aria-selected={this.selected}
        class="flyout-item"
        onClick={() => {
          this.itemClick.emit({ item: this.item, selected: this.selected });
        }}
      >
        {this.label}
      </button>
    ) as JSX.Element;
  }
}
