/* eslint-disable @typescript-eslint/no-empty-function */

// Original code from https://github.com/luwes/wesc

import { parseHTML } from 'linkedom';

(() => {
  if (typeof window !== 'undefined') {
    return;
  }

  const {
    document,
    customElements,
    Event,
    CustomEvent,
    DocumentFragment,
    DOMParser,
    HTMLElement: LinkedomHTMLElement,
    HTMLTemplateElement,
    MutationObserver,
  } = parseHTML('...');

  class HTMLElement extends LinkedomHTMLElement {
    private static _observedAttributes: string[] = [];
    static get observedAttributes() {
      return HTMLElement._observedAttributes;
    }

    static set observedAttributes(value) {
      HTMLElement._observedAttributes = value;
    }

    attachInternals() {
      return {
        checkValidity: () => true,
        reportValidity: () => true,
        setFormValue: () => {},
        setValidity: () => {},
      } as unknown as ElementInternals;
    }
  }

  class Storage {
    key() {}
    getItem() {}
    setItem() {}
    removeItem() {}
    clear() {}
  }

  const localStorage = new Storage();

  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  class CSSStyleDeclaration {
    getPropertyPriority() {}
    getPropertyValue() {}
    item() {}
    removeProperty() {}
    setProperty() {}
  }

  Object.assign(globalThis, {
    document,
    customElements,
    Event,
    CustomEvent,
    DocumentFragment,
    DOMParser,
    HTMLElement,
    HTMLTemplateElement,
    MutationObserver,
    localStorage,
    ResizeObserver,
    CSSStyleDeclaration,
    getComputedStyle: function getComputedStyle() {
      return new CSSStyleDeclaration();
    },
    cancelAnimationFrame: function cancelAnimationFrame() {},
    navigator: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    requestAnimationFrame: function requestAnimationFrame(callback: () => void) {
      callback();
    },
  });
})();
