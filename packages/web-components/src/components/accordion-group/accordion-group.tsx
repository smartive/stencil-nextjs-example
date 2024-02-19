import { Component, Element, Event, EventEmitter, Host, JSX, Prop, Watch, h } from '@stencil/core';

const isHTMLAbcAccordionItemElement = (element: string | HTMLAbcAccordionElement): element is HTMLAbcAccordionElement => {
  if (typeof element === 'object' && typeof element.item === 'string') {
    return true;
  }

  return false;
};

@Component({
  tag: 'abc-accordion-group',
  styleUrl: 'accordion-group.scss',
  shadow: true,
})
export class AccordionContainer {
  @Element()
  host: HTMLAbcAccordionGroupElement;

  @Prop({ reflect: true })
  selectedAccordion: HTMLAbcAccordionElement['item'];

  @Event()
  accordionChange: EventEmitter<HTMLAbcAccordionElement['item']>;

  @Watch('selectedAccordion')
  onAccordionChange() {
    this.accordionChange.emit(this.selectedAccordion);

    if (typeof this.selectedAccordion === 'string') {
      const activeAccordion = this.getItems(this.selectedAccordion);
      this.accordions.forEach((accordion) => {
        if (activeAccordion?.item !== accordion.item) {
          accordion.open = false;
        }
      });
    }
  }

  private get accordions() {
    return Array.from(this.host.querySelectorAll('abc-accordion'));
  }

  private getItems(accordion: string | HTMLAbcAccordionElement): HTMLAbcAccordionElement | undefined {
    return isHTMLAbcAccordionItemElement(accordion) ? accordion : this.accordions.find((t) => t.item === accordion);
  }

  private select(item: string | undefined) {
    if (this.selectedAccordion === item) {
      return false;
    }
    this.selectedAccordion = item;

    return true;
  }

  render() {
    return (
      <Host
        onAccordionClick={({ detail: { item, open } }: { detail: { open: boolean; item?: string } }) => {
          if (open) {
            this.select(item);
          }
        }}
      >
        <slot name="accordions"></slot>
      </Host>
    ) as JSX.Element;
  }
}
