// Original code from https://github.com/luwes/wesc

import { RefObject, useEffect } from 'react';

export const NATIVE_GLOBAL_EVENTS: (keyof GlobalEventHandlersEventMap)[] = [
  'animationcancel',
  'animationend',
  'animationiteration',
  'animationstart',
  'beforeinput',
  'blur',
  'cancel',
  'change',
  'click',
  'close',
  'contextmenu',
  'copy',
  'cut',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'emptied',
  'error',
  'focus',
  'focusin',
  'focusout',
  'formdata',
  'input',
  'invalid',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointercancel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'reset',
  'resize',
  'scroll',
  'scrollend',
  'select',
  'selectionchange',
  'selectstart',
  'slotchange',
  'submit',
  'toggle',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'transitioncancel',
  'transitionend',
  'transitionrun',
  'transitionstart',
  'wheel',
];

export const omitEventCallbacks = (customEvents: string[], props: Record<string, unknown>) => {
  const eventCallbacks = [...customEvents, ...NATIVE_GLOBAL_EVENTS].map((event) => toCallbackName(event));

  return Object.fromEntries(Object.entries(props).filter(([key]) => !eventCallbacks.includes(key)));
};

const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase();

export const toPascalCase = (kebabText: string) => kebabText.replace(/(^\w|-\w)/g, clearAndUpper);

const toCallbackName = (name: string) => `on${toPascalCase(name)}`;

export const useEventListeners = (
  ref: RefObject<HTMLElement>,
  customEvents: string[],
  props: Record<string, EventListenerOrEventListenerObject>,
) => {
  const events = [...customEvents, ...NATIVE_GLOBAL_EVENTS];
  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }

    for (const event of events) {
      const callback = props[toCallbackName(event)];
      if (callback) {
        current.addEventListener(event, props[toCallbackName(event)]);
      }
    }

    return () => {
      for (const event of events) {
        const callback = props[toCallbackName(event)];
        if (callback) {
          current.removeEventListener(event, props[toCallbackName(event)]);
        }
      }
    };
  }, [ref, props, customEvents]);
};
