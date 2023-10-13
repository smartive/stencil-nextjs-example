import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { ICON_SIZES } from '../icons/exports';

@Component({
  tag: 'abc-dropdown-button',
  styleUrl: 'dropdown-button.scss',
  shadow: true,
})
export class DropdownButton {
  @Element()
  host: HTMLAbcDropdownButtonElement;

  @Prop()
  disabled = false;

  @Prop()
  required = false;

  @Prop()
  placeholder = false;

  @Prop()
  label: string;

  @Prop()
  text!: string;

  @Prop({ reflect: true })
  open = false;

  @State()
  focused = false;

  @Event()
  dropdownButtonFocus: EventEmitter<void>;

  @Event()
  dropdownButtonBlur: EventEmitter<void>;

  @Event()
  dropdownButtonClick: EventEmitter<void>;

  render() {
    return (
      <label
        class={`dropdown-button ${this.required ? 'required' : ''} ${this.disabled ? 'disabled' : ''} ${
          this.focused ? 'focused' : ''
        }`}
      >
        {this.label && (
          <div class="dropdown-button__label">
            {this.label} {this.required && <span class="asterisk">*</span>}
          </div>
        )}
        <div class="dropdown-button__wrapper">
          <button
            onFocus={() => this.dropdownButtonFocus.emit()}
            onBlur={() => this.dropdownButtonBlur.emit()}
            class="dropdown-button__button"
            disabled={this.disabled}
            onClick={() => this.dropdownButtonClick.emit()}
            aria-haspopup="listbox"
            aria-expanded={this.open}
          >
            <div class={this.placeholder ? 'dropdown-button__text' : ''}>{this.text}</div>

            <abc-icon-chevron-down class="dropdown-button__icon" size={ICON_SIZES.SM} />
          </button>
        </div>
        <slot></slot>
      </label>
    );
  }
}
