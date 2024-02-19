import { Component, h, Prop } from '@stencil/core';
import { BUTTON_SIZES, BUTTON_TYPE, BUTTON_VARIANTS } from './exports';
import { isExternalUrl } from '../../utils';

/**
 * @slot - For Label and Icon
 */
@Component({
  tag: 'abc-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Prop()
  disabled = false;

  @Prop({ reflect: true })
  variant: BUTTON_VARIANTS = BUTTON_VARIANTS.PRIMARY;

  @Prop({ reflect: true })
  size: BUTTON_SIZES = BUTTON_SIZES.MD;

  @Prop()
  type: 'button' | 'submit' | 'reset' = 'submit';

  @Prop({ reflect: true })
  as: BUTTON_TYPE = BUTTON_TYPE.BUTTON;

  @Prop()
  href: string;

  @Prop()
  ariaLabel: string;

  @Prop()
  target: '_blank' | '_self' | '_parent' | '_top' = '_self';

  private isExternalURL() {
    return isExternalUrl(this.href);
  }

  render() {
    if (this.as === BUTTON_TYPE.BUTTON) {
      return (
        <button part="button" class="button" type={this.type} disabled={this.disabled}>
          <slot></slot>
        </button>
      ) as JSX.Element;
    }

    return (
      <a
        part="button"
        class="button"
        href={this.href}
        aria-label={this.ariaLabel}
        target={this.target}
        rel={this.isExternalURL() ? 'noreferrer' : undefined}
      >
        <slot></slot>
      </a>
    ) as JSX.Element;
  }
}
