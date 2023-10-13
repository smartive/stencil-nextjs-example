// Original code from https://github.com/luwes/wesc

/* eslint-disable @typescript-eslint/no-empty-function */
/* global globalThis */
import { parseHTML } from 'linkedom';

let preshimGlobalThis;

shim();

export function shim() {
  if (preshimGlobalThis) {
    return;
  }

  const {
    document,
    customElements,
    Event,
    CustomEvent,
    DocumentFragment,
    DOMParser,
    HTMLElement,
    HTMLTemplateElement,
    MutationObserver,
  } = parseHTML('...');

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
