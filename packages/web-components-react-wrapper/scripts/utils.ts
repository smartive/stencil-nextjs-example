import { stdout } from 'node:process';

const clearAndUpper = (kebabText) => kebabText.replace(/-/, '').toUpperCase();

const toPascalCase = (kebabText) => kebabText.replace(/(^\w|-\w)/g, clearAndUpper);

const toExport = (exportName) => `export { ${exportName} };`;

export const toModuleFile = (defineCustomElementFunction, importPath, elementName) => `'use client';

import React from 'react';
import { ${defineCustomElementFunction} } from '${importPath}';
import { toNativeProps } from './lib/utils.js';

if (!customElements.get('${elementName}')) {
  ${defineCustomElementFunction}();
}

const ${toPascalCase(elementName)} = React.forwardRef(({ children = [], ...props }, ref) =>
  React.createElement('${elementName}', toNativeProps({ ...props, ref }), children),
);

${toExport(toPascalCase(elementName))}
`;

const toTypeDeclaration = (elementName) =>
  `declare const ${toPascalCase(
    elementName,
  )}: React.ForwardRefExoticComponent<React.PropsWithChildren<Partial<EnumsToStringLiterals<Components.${toPascalCase(
    elementName,
  )}> & { slot: string }>> & React.RefAttributes<HTMLElement | undefined>>;`;

export const toTypesFile = (types, enums) => `import type { Components, ${enums.join(', ')} } from 'abc-web-components';
import type React from 'react';

type IsEnum<T> = T extends ${enums.join(' | ')} ? true : false;
type EnumsToStringLiterals<T> = {
  [K in keyof T]: Exclude<IsEnum<T[K]> extends true ? \`\${T[K]}\` : T[K], 'undefined'>;
};

${types.map(toTypeDeclaration).join('\n')}

${toExport(types.map(toPascalCase).join(',\n'))}
`;

export const toIndexFile = (modules) => `${modules.map((module) => `export * from './${module}';`).join('\n')}\n`;

export const printProgress = (progress) => {
  if (!stdout.clearLine) {
    return;
  }

  stdout.clearLine(0);
  stdout.cursorTo(0);
  stdout.write(`Progress: ${parseInt(progress)}%`);
  if (progress === 100) {
    stdout.write('\n');
  }
};
