import { Component, Element, Event, EventEmitter, Host, JSX, h } from '@stencil/core';

@Component({
  tag: 'abc-accordion-group',
  styleUrl: 'accordion-group.scss',
  shadow: true,
})
export class AccordionContainer {
  @Element()
  host: HTMLAbcAccordionGroupElement;

  @Event()
  accordionChange: EventEmitter<HTMLAbcAccordionElement['item']>;

  render() {
    return (
      <Host
        onAccordionClick={({ detail: { item, open } }: { detail: { open: boolean; item?: string } }) => {
          if (open) {
            this.accordionChange.emit(item);
          }
        }}
      >
        <slot name="accordions"></slot>
      </Host>
    ) as JSX.Element;
  }
}
