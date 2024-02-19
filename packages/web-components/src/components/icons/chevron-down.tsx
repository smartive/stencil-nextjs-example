import { Component, Prop, h } from '@stencil/core';
import { ICON_SIZES } from './exports';

@Component({
  tag: 'abc-icon-chevron-down',
  styleUrl: 'icons.scss',
  shadow: true,
})
export class AbcIconChevronDown {
  @Prop({ reflect: true })
  size: ICON_SIZES = ICON_SIZES.MD;

  render() {
    switch (this.size) {
      case ICON_SIZES.XS:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            fill="none"
          >
            <path stroke-width="1.5" d="m4 6 4 4 4-4" />
          </svg>
        ) as JSX.Element;
      case ICON_SIZES.SM:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            fill="none"
          >
            <path stroke-width="2" d="m6 9 6 6 6-6" />
          </svg>
        ) as JSX.Element;
      case ICON_SIZES.MD:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            fill="none"
          >
            <path stroke-width="2.3" d="m8 12 8 8 8-8" />
          </svg>
        ) as JSX.Element;
      case ICON_SIZES.LG:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            fill="none"
          >
            <path stroke-width="2.5" d="m10 15 10 10 10-10" />
          </svg>
        ) as JSX.Element;
      case ICON_SIZES.XL:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            fill="none"
          >
            <path stroke-width="3" d="m12 18 12 12 12-12" />
          </svg>
        ) as JSX.Element;
      case ICON_SIZES.XXL:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56 56"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            fill="none"
          >
            <path stroke-width="3.5" d="m14 21 14 14 14-14" />
          </svg>
        ) as JSX.Element;
    }
  }
}
