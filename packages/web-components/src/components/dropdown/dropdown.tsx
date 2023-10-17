import { Component, Element, Event, EventEmitter, Host, Listen, Prop, State, Watch, h } from '@stencil/core';

const isHTMLAbcFlyoutItemElement = (element: string | HTMLAbcFlyoutItemElement): element is HTMLAbcFlyoutItemElement => {
  if (typeof element === 'object' && typeof element.item === 'string') {
    return true;
  }

  return false;
};

@Component({
  tag: 'abc-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class Dropdown {
  @Element()
  host: HTMLAbcDropdownElement;

  @Event()
  dropdownChange: EventEmitter<HTMLAbcFlyoutItemElement['item']>;

  @Prop({ reflect: true })
  selectedItem: HTMLAbcFlyoutItemElement['item'];

  @Prop()
  disabled = false;

  @Prop()
  required = false;

  @Prop()
  label!: string;

  @Prop()
  text!: string;

  @Prop()
  hint?: string;

  @Prop()
  error?: string;

  @Prop({ reflect: true })
  open = false;

  @State()
  focused = false;

  @State()
  keyboardEvent = false;

  @Listen('click', { capture: true, target: 'window' })
  handleClick() {
    this.keyboardEvent = false;
  }

  @Listen('keydown', { capture: true, target: 'window' })
  handleKeyDown() {
    this.keyboardEvent = true;
  }

  @Listen('dropdownButtonBlur', { capture: true })
  onButtonBlur() {
    this.focused = false;
  }

  @Listen('dropdownButtonFocus', { capture: true })
  onButtonFocus() {
    this.keyboardEvent && (this.focused = true);
  }

  @Listen('dropdownButtonClick', { capture: true })
  onButtonClick() {
    this.open = !this.open;
  }

  @Watch('selectedItem')
  onDropdownChange() {
    this.dropdownChange.emit(this.selectedItem);
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

  componentWillUpdate() {
    const selectedItem = this.getItems(this.selectedItem);
    if (selectedItem) {
      selectedItem.selected = true;
    }
  }

  render() {
    const itemLabel = this.getItems(this.selectedItem)?.label;

    return (
      <Host
        onItemClick={({ detail: { item } }) => {
          this.select(item);
        }}
      >
        <abc-dropdown-button
          disabled={this.disabled}
          required={this.required}
          label={this.label}
          placeholder={typeof itemLabel === 'string'}
          open={this.open}
          text={itemLabel || this.text}
        >
          <div class="dropdown__information-wrapper">
            <div>
              {this.hint && (typeof this.error === 'undefined' || this.error === '') && (
                <span class="dropdown__hint">{this.hint}</span>
              )}
              {this.error && <abc-error-hint text={this.error} />}
            </div>
            <div class="dropdown__flyout" aria-haspopup="true" aria-expanded={this.open ? 'true' : 'false'}>
              <slot></slot>
            </div>
          </div>
        </abc-dropdown-button>
      </Host>
    );
  }
}
