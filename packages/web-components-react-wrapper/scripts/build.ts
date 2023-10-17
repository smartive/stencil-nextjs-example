import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, format, join, parse, relative } from 'node:path';
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import { patchPackages, printProgress, toIndexFile, toModuleFile, toTypesFile } from './utils';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '..', 'dist', 'esm');
const WEB_COMPONENTS_DIST_DIR = join(__dirname, '..', '..', 'web-components', 'dist');
const COMPONENTS_DIR = join(WEB_COMPONENTS_DIST_DIR, 'components');

const createReactWrapperModules = async ({ entryPoints, distRoot }) => {
  if (!entryPoints?.length) {
    console.error('no entrypoints! bailing');

    return;
  }

  try {
    const modules: string[] = [];
    const types: string[] = [];
    console.info('writing modules to', relative(__dirname, distRoot));
    let i = 0;
    for (const importPath of entryPoints) {
      const component = await import(importPath);

      let defineCustomElementFunction = 'd';
      if (component?.d) {
        defineCustomElementFunction = 'd';
      } else if (component?.defineCustomElement) {
        defineCustomElementFunction = 'defineCustomElement';
      } else {
        console.error('no defineCustomElement found for', importPath);
        continue;
      }

      const webComponentTagName = Object.values<Record<string, string>>(component).find((value) =>
        Object.keys(value).includes('is'),
      )?.is;
      if (!webComponentTagName) {
        console.error('no web component tag name found for', importPath);
        continue;
      }

      const { name } = parse(require.resolve(importPath));
      const modulePath = format({ dir: distRoot, name, ext: '.js' });
      const componentPath = `../components/${name}.js`;
      writeFileSync(modulePath, toModuleFile(defineCustomElementFunction, componentPath, webComponentTagName));
      types.push(webComponentTagName);
      modules.push(name);
      i++;
      printProgress((i / entryPoints.length) * 100);
    }

    const enums = readFileSync(join(WEB_COMPONENTS_DIST_DIR, 'types', 'components.d.ts'), 'utf-8')
      ?.match(/export { (([A-Z][A-Z\d_]+,? ?)+) } from ".+exports?";/g)
      ?.flatMap((match) =>
        match
          .split('{')[1]
          .split('}')[0]
          .split(',')
          .map((enumName) => enumName.trim()),
      );

    writeFileSync(join(distRoot, 'index.js'), toIndexFile(modules));
    writeFileSync(join(distRoot, 'index.d.ts'), toTypesFile(types, enums));
  } catch (err) {
    console.error('unexpected error generating module!', err);
    exit(1);
  }

  console.info('writing modules completed!');
};

patchPackages();
createReactWrapperModules({
  entryPoints: readdirSync(COMPONENTS_DIR)
    .filter((file) => file.startsWith('abc') && file.endsWith('.js'))
    .map((file) => join(COMPONENTS_DIR, file)),
  distRoot: join(DIST_DIR),
})
  .then(() => patchPackages(true))
  .catch((err) => {
    console.error('unexpected error generating module!', err);
    exit(1);
  });
