/* eslint-disable */

import type React from 'react';
// @ts-expect-error - leads only to error in template file
import type { Components, __IMPORTS_ } from './components';

type GlobalEventHandlers = { __GLOBAL_EVENTS__ };
// @ts-expect-error - leads only to error in template file
type IsEnum<T> = T extends __ENUMS__ ? true : false;
type EnumsToStringLiterals<T> = {
  // @ts-expect-error - leads only to error in template file
  [K in keyof T]: Exclude<IsEnum<T[K]> extends true ? `${T[K]}` : T[K], 'undefined'>;
};

// @ts-expect-error - leads only to error in template file
__ELEMENT_TYPES__;

// @ts-expect-error - leads only to error in template file
export * from './lib/client/with-ssr';

// @ts-expect-error - leads only to error in template file
export { __EXPORTS__ };
