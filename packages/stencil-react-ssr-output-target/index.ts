import type { OutputTargetCustom } from '@stencil/core/internal';
import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

/**
 * Creates an output target for binding Stencil components to be used in a React SSR environment
 *
 * @param outputTarget the user-defined output target defined in a Stencil configuration file
 * @returns an output target that can be used by the Stencil compiler
 */
export const reactSSROutputTarget = (
  config: { package?: PackageJsonConfig; outPath?: string } = {},
): OutputTargetCustom => ({
  type: 'custom',
  name: 'react-ssr-library',
  validate({ outputTargets }) {
    if (!['dist-custom-elements', 'dist-hydrate-script'].every((target) => outputTargets.some((o) => o.type === target))) {
      throw new Error('outputTargets must include `dist-custom-elements` and `dist-hydrate-script`');
    }
  },
  async generator({ rootDir, fsNamespace }, _, buildContext) {
    const { debug } = buildContext.config.flags;
    const timespan = buildContext.createTimeSpan(`generate react started`, true);

    const stencilDistDir = path.join(rootDir, 'dist');
    const outputDir = path.join(rootDir, ...(config.outPath ? [config.outPath] : ['dist', 'react-components-ssr']));
    const distDir = path.join(outputDir, 'dist');
    const esmDir = path.join(distDir, 'esm');
    const typesDir = path.join(distDir, 'types');

    del(distDir);
    cpy(path.join(stencilDistDir, 'components', '*.js'), path.join(esmDir, 'components'), true);
    cpy(path.join(stencilDistDir, 'types'), path.join(typesDir, 'web-components'));
    cpy(path.join(rootDir, 'hydrate', '*.js'), path.join(esmDir, 'hydrate'), true);

    exec(
      'tsx',
      [
        path.join(__dirname, 'scripts', 'build.ts'),
        '--dist-root',
        esmDir,
        '--stencil-dist-dir',
        stencilDistDir,
        '--components-prefix',
        fsNamespace.split('-').shift(),
      ],
      debug,
    );

    exec(
      'tsc',
      [
        '--project',
        path.join(__dirname, 'tsconfig.plugin.json'),
        '--rootDir',
        __dirname,
        '--outDir',
        esmDir,
        '--declarationDir',
        typesDir,
      ],
      debug,
    );

    exec(
      'esbuild',
      [
        path.join(esmDir, '*.js'),
        path.join(esmDir, '**', '*.js'),
        path.join(esmDir, '**', '**', '*.js'),
        '--log-level=error',
        `--outdir=${path.join(distDir, 'cjs')}`,
        '--format=cjs',
      ],
      debug,
    );

    createPackageJson(outputDir, config.package || {});

    timespan.finish(`generate react finished`);
  },
});

const del = (path: string) => {
  const { error } = spawnSync('del-cli', ['--force', path], { stdio: 'inherit' });
  if (error) {
    throw error;
  }
};

const cpy = (from: string, to: string, flat = false) => {
  const { error } = spawnSync('cpy', [...(flat ? ['--flat'] : []), from, to], { stdio: 'inherit' });
  if (error) {
    throw error;
  }
};

const exec = (command: string, args: string[], debug = false) => {
  const { error } = spawnSync(command, args, { stdio: debug ? 'inherit' : 'ignore' });
  if (error) {
    throw error;
  }
};

type PackageJsonConfig = {
  stencilPatched?: boolean;
  name?: string;
  version?: string;
  author?: string;
  license?: string;
};
const createPackageJson = (
  outputDir: string,
  {
    author = 'Stencil',
    license = 'ISC',
    name = 'stencil-react-ssr-output-target',
    version = '0.0.0',
    stencilPatched = false,
  }: PackageJsonConfig,
) => {
  const outputPackageJsonPath = path.join(outputDir, 'package.json');
  const require = createRequire(__filename);
  const templatePackageJson = require(path.join(__dirname, 'scripts', 'templates', 'package.json'));

  if (existsSync(outputPackageJsonPath)) {
    const currentPackageJson = require(outputPackageJsonPath);
    writeFileSync(outputPackageJsonPath, JSON.stringify(Object.assign(templatePackageJson, currentPackageJson), null, 2));
  } else {
    templatePackageJson.name = name;
    templatePackageJson.version = version;
    templatePackageJson.author = author;
    templatePackageJson.license = license;

    if (stencilPatched) {
      templatePackageJson.dependencies.linkedom = '0.16.1';
      templatePackageJson.dependencies['@stencil/core'] = 'github:smartive/stencil-patched#v4.12.1';
    } else {
      templatePackageJson.dependencies['@stencil/core'] = '^4.12.1';
    }

    writeFileSync(outputPackageJsonPath, JSON.stringify(templatePackageJson, null, 2));
  }
};
