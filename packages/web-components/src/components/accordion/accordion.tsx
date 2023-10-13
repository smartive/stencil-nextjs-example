import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import { ACCORDION_VARIANTS } from './export';

@Component({
  tag: 'abc-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion {
  @Element()
  host: HTMLAbcAccordionElement;

  @Event()
  accordionClick: EventEmitter<{ open: boolean; item?: string }>;

  @Prop({ reflect: true })
  open = false;

  @Prop({ reflect: true })
  variant = ACCORDION_VARIANTS.WHITE;

  @Prop()
  summary: string;

  @Prop({ reflect: true })
  item?: string;

  componentDidLoad() {
    const { previousSibling, nextSibling, shadowRoot } = this.host;
    const detailsElement = shadowRoot?.querySelector('details');
    if (detailsElement) {
      if (previousSibling) {
        detailsElement.style.borderTopLeftRadius = '0';
        detailsElement.style.borderTopRightRadius = '0';
      }
      if (nextSibling) {
        detailsElement.style.borderBottomLeftRadius = '0';
        detailsElement.style.borderBottomRightRadius = '0';
      }
    }
  }

  render() {
    return (
      <details
        class="accordion"
        open={this.open}
        aria-expanded={this.open}
        onToggle={(event) => {
          this.open = (event.target as HTMLDetailsElement).open;
          this.accordionClick.emit({ open: this.open, item: this.item });
        }}
      >
        <summary class="accordion__summary">
          {this.summary}
          <abc-icon-chevron-down class="accordion__icon" />
        </summary>
        <p class="accordion__paragraph">
          <slot name="details" />
        </p>
      </details>
    );
  }
}
