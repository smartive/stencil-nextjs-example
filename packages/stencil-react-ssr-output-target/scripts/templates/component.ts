/* eslint-disable */
'use client';

import React, { useImperativeHandle, useRef } from 'react';
// @ts-expect-error - leads only to error in template file
import { __DEFINE_CUSTOM_ELEMENT_FUNCTION__ } from '__IMPORT_PATH__';
// @ts-expect-error - leads only to error in template file
import { omitEventCallbacks, toNativeProps, useEventListeners } from './lib/utils.js';

// @ts-expect-error - leads only to error in template file
const CUSTOM_EVENTS = __CUSTOM_EVENTS__;
const ELEMENT_NAME = '__ELEMENT_NAME__';

if (typeof customElements !== 'undefined' && !customElements.get(ELEMENT_NAME)) {
  __DEFINE_CUSTOM_ELEMENT_FUNCTION__();
}

// @ts-expect-error - leads only to error in template file
export const __PASCAL_CASE_ELEMENT_NAME__ = React.forwardRef(({ children = [], ...props }, ref) => {
  const nativeProps = toNativeProps(omitEventCallbacks(CUSTOM_EVENTS, props));
  if (typeof window !== 'undefined') {
    const innerRef = useRef();
    useImperativeHandle(ref, () => innerRef.current);
    useEventListeners(innerRef, CUSTOM_EVENTS, props);

    return React.createElement(ELEMENT_NAME, { ...nativeProps, ref: innerRef }, children);
  }

  return React.createElement(ELEMENT_NAME, { ...nativeProps, ref }, children);
});
