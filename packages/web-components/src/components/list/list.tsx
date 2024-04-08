import { Component, Element, Prop, State, h } from '@stencil/core';

type ListItem = {
  id: string;
  title: string;
  description: string;
};

@Component({
  tag: 'abc-list',
  shadow: true,
})
export class List {
  @Prop()
  items: ListItem[] = [];

  @Prop()
  highlightedItem: string;

  @Element()
  host: HTMLAbcListElement;

  @State()
  parsedItems: ListItem[] = [];

  private parse(value: string) {
    return JSON.parse(value.replace(/&quot;/g, '"')) as ListItem[];
  }

  private filterString(value: unknown[]) {
    return value.filter((item) => typeof item === 'string').pop() as string | undefined;
  }

  connectedCallback() {
    const rawItems = this.filterString([this.host.getAttribute('items'), this.items]);
    this.parsedItems = rawItems !== undefined ? this.parse(rawItems) : this.items;
  }

  render() {
    return (
      <ul>
        {this.parsedItems.map(
          ({ id, title, description }) =>
            (
              <li style={id === this.highlightedItem ? { background: 'yellow' } : undefined}>
                <b>{title}</b>
                <p>{description}</p>
              </li>
            ) as JSX.Element,
        )}
      </ul>
    ) as JSX.Element;
  }
}
