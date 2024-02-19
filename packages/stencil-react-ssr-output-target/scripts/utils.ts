import { parse as babelParse } from '@babel/parser';
import { Statement, TSInterfaceDeclaration, TSModuleDeclaration, TSPropertySignature, TSTypeElement } from '@babel/types';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { NATIVE_GLOBAL_EVENTS, toPascalCase } from '../lib/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toKebabCase = (input: string) =>
  input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const toWebComponentTagName = (eventMapName: string) =>
  toKebabCase(eventMapName.replace('HTML', '').replace('ElementEventMap', ''));

const isElementEventMap = (node: Statement): node is TSInterfaceDeclaration =>
  node.type === 'TSInterfaceDeclaration' && node.id.name.endsWith('ElementEventMap');

const isGlobalTSModuleDeclaration = (node: Statement): node is TSModuleDeclaration =>
  node.type === 'TSModuleDeclaration' && 'name' in node.id && node.id.name === 'global';

const isTSPropertySignature = (node: TSTypeElement): node is TSPropertySignature => node.type === 'TSPropertySignature';

export const parseComponentsEvents = (source: string) => {
  const { body } = babelParse(source, {
    sourceType: 'module',
    plugins: [['typescript', { dts: true }]],
  }).program;

  return body.reduce((events, node) => {
    if (!(isGlobalTSModuleDeclaration(node) && Array.isArray(node.body.body))) {
      return events;
    }

    const statements = node.body.body.filter(isElementEventMap).map(({ id, body }) => ({
      name: id.name,
      body: body.body.filter(isTSPropertySignature),
    }));

    for (const { name, body } of statements) {
      events[toWebComponentTagName(name)] = {
        name,
        events: body.map(({ key }) => ('value' in key ? key.value : undefined)).filter(Boolean) as string[],
      };
    }

    return events;
  }, {}) as Record<string, { name: string; events: string[] }>;
};

export const parseEnums = (source: string) =>
  source?.match(/export { (([A-Z][A-Z\d_]+,? ?)+) } from ".+exports?";/g)?.flatMap((match) =>
    match
      .split('{')[1]
      .split('}')[0]
      .split(',')
      .map((enumName) => enumName.trim()),
  ) ?? [];

const stripTemplateComments = (source: string) =>
  source
    .replace(/\/\/ @ts-expect-error - leads only to error in template file\n/g, '')
    .replace(/\/\* eslint-disable \*\/\n/g, '');

export const compileTemplate = (
  templateFilename: string,
  {
    elementName,
    defineCustomElementFunction = '',
    importPath = '',
    customEvents = [],
    types = false,
  }: {
    elementName: string;
    defineCustomElementFunction?: string;
    importPath?: string;
    customEvents?: string[];
    types?: boolean;
  },
) => {
  const template = readFileSync(`${__dirname}/templates/${templateFilename}`).toString();
  const events = types
    ? customEvents.length > 0
      ? ` & { ${customEvents.join(',\n ')} }`
      : ''
    : customEvents.length > 0
      ? `['${customEvents.join(`', '`)}']`
      : '[]';
  const compiled = template
    .replace(/__DEFINE_CUSTOM_ELEMENT_FUNCTION__/g, defineCustomElementFunction)
    .replace(/__IMPORT_PATH__/g, importPath)
    .replace(/__CUSTOM_EVENTS__/g, events)
    .replace(/__ELEMENT_TAG_PREFIX__/g, elementName.split('-')[0])
    .replace(/__PASCAL_CASE_ELEMENT_NAME__/g, toPascalCase(elementName))
    .replace(/__ELEMENT_NAME__/g, elementName);

  return stripTemplateComments(compiled);
};

const toElementTypeDeclaration = (
  elementName: string,
  { name, events }: { name: string; events: string[] } = { name: '', events: [] },
) =>
  compileTemplate('types.component.d.ts', {
    elementName,
    customEvents: events.map(
      (event) => `on${toPascalCase(event)}: (event: ${toPascalCase(elementName)}CustomEvent<${name}['${event}']>) => void`,
    ),
    types: true,
  });

export const toTypesFile = (
  elements: string[],
  enums: string[],
  customEvents: Record<string, { name: string; events: string[] }>,
) => {
  const template = readFileSync(`${__dirname}/templates/types.d.ts`).toString();
  const globalEvents = NATIVE_GLOBAL_EVENTS.map(
    (event) => `on${toPascalCase(event)}: (event: GlobalEventHandlersEventMap['${event}']) => void`,
  );
  const elementTypes = elements.map((element) => toElementTypeDeclaration(element, customEvents[element]));
  const imports = [
    ...enums,
    ...elements.map((element) => customEvents[element] && `${toPascalCase(element)}CustomEvent`).filter(Boolean),
  ];
  const exports = elements
    .map(toPascalCase)
    .flatMap((element) => [element, `${element}ServerOnly`, `static${element}HtmlServerOnly`]);

  const compiled = template
    .replace(/__IMPORTS_/g, imports.join(', '))
    .replace(/__GLOBAL_EVENTS__/g, globalEvents.join(',\n'))
    .replace(/__ENUMS__/g, enums.join(' | '))
    .replace(/__ELEMENT_TYPES__;/g, elementTypes.join('\n'))
    .replace(/__EXPORTS__/g, exports.join(',\n'));

  return stripTemplateComments(compiled);
};

export const toIndexFile = (modules: string[]) =>
  `${modules
    .flatMap((module) => [`export * from './${module}';`, `export * from './${module}.server-only';`])
    .join('\n')}\n`;

export const printProgress = (progress: number) => {
  if (!stdout.clearLine) {
    return;
  }

  stdout.clearLine(0);
  stdout.cursorTo(0);
  stdout.write(`Progress: ${parseInt(`${progress}`)}%`);
  if (progress === 100) {
    stdout.write('\n');
  }
};
