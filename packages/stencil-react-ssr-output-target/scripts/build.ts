import { program } from 'commander';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { format, join, parse } from 'node:path';
import { exit } from 'node:process';
import { compileTemplate, parseComponentsEvents, parseEnums, printProgress, toIndexFile, toTypesFile } from './utils';

const createReactWrapperModules = async ({ entryPoints, distRoot }: { entryPoints: string[]; distRoot: string }) => {
  if (!entryPoints?.length) {
    throw new Error('No entry points found');
  }

  try {
    const modules: string[] = [];
    const types: string[] = [];
    const componentsTypePath = join(distRoot, '..', 'types', 'components.d.ts');
    const componentsTypeSource = readFileSync(componentsTypePath, 'utf-8');
    const componentsEvents = parseComponentsEvents(componentsTypeSource);
    const enums = parseEnums(componentsTypeSource);

    let i = 0;
    for (const importPath of entryPoints) {
      const component = (await import(importPath)) as Record<string, Record<string, string>>;

      let defineFunctionName = 'd';
      if (component?.d) {
        defineFunctionName = 'd';
      } else if (component?.defineCustomElement) {
        defineFunctionName = 'defineCustomElement';
      } else {
        console.error('no defineCustomElement found for', importPath);
        continue;
      }

      const elementName = Object.values<Record<string, string>>(component).find((value) =>
        Object.keys(value).includes('is'),
      )?.is;
      if (!elementName) {
        console.error('no web component tag name found for', importPath);
        continue;
      }

      const { name } = parse(createRequire(import.meta.url).resolve(importPath));

      writeFileSync(
        format({ dir: distRoot, name, ext: '.js' }),
        compileTemplate('component.ts', {
          elementName,
          defineCustomElementFunction: defineFunctionName,
          importPath: `./components/${name}.js`,
          customEvents: elementName in componentsEvents ? componentsEvents[elementName].events : undefined,
        }),
      );

      writeFileSync(
        format({ dir: distRoot, name: `${name}.server-only`, ext: '.js' }),
        compileTemplate('component.server-only.ts', { elementName }),
      );

      types.push(elementName);
      modules.push(name);
      i++;
      printProgress((i / entryPoints.length) * 100);
    }

    writeFileSync(join(distRoot, 'index.js'), toIndexFile(modules));
    writeFileSync(join(distRoot, '..', 'types', 'index.d.ts'), toTypesFile(types, enums, componentsEvents));
  } catch (err) {
    console.error('unexpected error generating module!', err);
    exit(1);
  }

  console.info('writing modules completed!');
};

const { distRoot, componentsPrefix }: { distRoot: string; componentsPrefix: string } = program
  .option('--dist-root <value>')
  .option('--components-prefix <value>')
  .parse()
  .opts();
const componentsDir = join(distRoot, 'components');
const entryPoints = readdirSync(componentsDir)
  .filter((file) => file.startsWith(componentsPrefix) && file.endsWith('.js'))
  .map((file) => join(componentsDir, file));

createReactWrapperModules({ entryPoints, distRoot }).catch((err) => {
  console.error('unexpected error generating module!', err);
  exit(1);
});
