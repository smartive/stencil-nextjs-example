import { Component, Element, Event, EventEmitter, Host, Listen, Prop, Watch, h } from '@stencil/core';

const isHTMLAbcFlyoutItemElement = (element: string | HTMLAbcFlyoutItemElement): element is HTMLAbcFlyoutItemElement => {
  if (typeof element === 'object' && typeof element.item === 'string') {
    return true;
  }

  return false;
};

@Component({
  tag: 'abc-flyout',
  styleUrl: 'flyout.scss',
  shadow: true,
})
export class Flyout {
  @Element()
  host: HTMLAbcFlyoutElement;

  @Prop({ reflect: true })
  selectedItem: HTMLAbcFlyoutItemElement['item'];

  @Watch('selectedItem')
  onFlyoutChange() {
    this.flyoutChange.emit(this.selectedItem);
  }

  @Event()
  flyoutChange: EventEmitter<HTMLAbcFlyoutItemElement['item']>;

  @Listen('keydown', { capture: true, target: 'window' })
  handleKeyDown(e: KeyboardEvent) {
    if (!(e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      return;
    }

    const items = this.items;
    let currentIndex = items.findIndex((item) => item === document.activeElement);

    if (currentIndex === -1) {
      return;
    }

    if (e.key === 'ArrowDown') {
      currentIndex = (currentIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    items[currentIndex].focusItem();
    e.preventDefault();
  }

  private select(item: string) {
    if (this.selectedItem === item) {
      return false;
    }
    this.selectedItem = item;
    return true;
  }

  private get items() {
    return Array.from(this.host.querySelectorAll('abc-flyout-item'));
  }

  private getItems(item: string | HTMLAbcFlyoutItemElement): HTMLAbcFlyoutItemElement | undefined {
    return isHTMLAbcFlyoutItemElement(item) ? item : this.items.find((t) => t.item === item);
  }

  componentWillRender() {
    const selectedItem = this.getItems(this.selectedItem);
    this.items.forEach((item) => {
      item.selected = false;
    });
    if (selectedItem) {
      selectedItem.selected = true;
    }
  }

  render() {
    return (
      <Host
        onItemClick={({ detail: { item } }) => {
          this.select(item);
        }}
      >
        <div class="flyout">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
