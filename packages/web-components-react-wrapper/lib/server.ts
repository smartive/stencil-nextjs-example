// Original code from https://github.com/luwes/wesc

/* eslint-disable @typescript-eslint/no-empty-function */
import type { parseHTML as parseHTMLType } from 'linkedom';

let preshimGlobalThis: Record<string, unknown> | undefined;

shim();

export function shim() {
  if (preshimGlobalThis) {
    return;
  }

  let parseHTML: typeof parseHTMLType;
  // With this try/catch it is possible to use this package without getting the warning
  // described here https://github.com/WebReflection/linkedom/issues/237
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    parseHTML = require('linkedom').parseHTML;
  } catch (e) {
    console.error(e);
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

  const shims = {
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
    requestAnimationFrame: function requestAnimationFrame(callback) {
      callback();
    },
  };

  preshimGlobalThis = {};
  for (const shim in shims) {
    preshimGlobalThis[shim] = globalThis[shim];
  }

  Object.assign(globalThis, shims);
}

export function unshim() {
  Object.assign(globalThis, preshimGlobalThis);
  preshimGlobalThis = undefined;
}
