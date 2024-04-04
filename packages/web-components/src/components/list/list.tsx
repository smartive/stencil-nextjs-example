/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Element, Prop, State, h } from '@stencil/core';

type ListItem = {
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

  @State()
  parsedItems: ListItem[] = [];

  @Element()
  host: HTMLAbcListElement;

  // @Watch('items')
  // dataDidChangeHandler(newItems: string) {
  //   this.items = JSON.parse(newItems) as ListItem[];
  // }

  // componentWillLoad() {
  //   console.log(this.items);
  //   console.log(this.host.getAttribute('items'));
  //   this.parsedItems = JSON.parse(this.host.getAttribute('items') ?? '[]') as ListItem[];
  // }

  // connectedCallback() {
  //   const items = this.host.getAttribute('items');
  //   console.log(items);
  //   this.parsedItems = JSON.parse(this.host.getAttribute('items') ?? '[]') as ListItem[];
  // }

  // connectedCallback() {
  //   this.parseItems();
  // }

  // private parseItems() {
  //   const items = this.host.getAttribute('items');
  //   console.log(items);
  //   this.parsedItems = JSON.parse(this.host.getAttribute('items') ?? '[]') as ListItem[];
  // }

  // connectedCallback() {
  //   this.parseItems();
  // }

  // private parseItems() {
  //   const itemsAttr = this.host.getAttribute('items');
  //   console.log('itemsAttr', itemsAttr); // Check what value is received
  //   if (itemsAttr !== null) {
  //     this.parsedItems = JSON.parse(itemsAttr) as ListItem[];
  //     console.log('parsed', this.parsedItems); // Check if the value is parsed correctly
  //   } else {
  //     this.parsedItems = [];
  //   }
  // }

  render() {
    const item = JSON.parse(this.host.getAttribute('items') ?? '[]') as ListItem[];

    return (
      <ul>
        {item.map((e) => {
          return (
            <li key={e.title}>
              <h2>{e.title}</h2>
              <p>{e.description}</p>
            </li>
          ) as JSX.Element;
        })}
      </ul>
    ) as JSX.Element;
  }
}
