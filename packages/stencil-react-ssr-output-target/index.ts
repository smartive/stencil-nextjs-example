import { createCompiler } from '@stencil/core/compiler';
import type { OutputTargetCustom } from '@stencil/core/internal';
import * as esbuild from 'esbuild';
import assert from 'node:assert';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

/**
 * Creates an output target for binding Stencil components to be used in a React SSR environment
 *
 * @param outputTarget the user-defined output target defined in a Stencil configuration file
 * @returns an output target that can be used by the Stencil compiler
 */
export const reactSSROutputTarget = (
  config: {
    package?: PackageJsonConfig;
    outPath?: string;
    type?: 'server-only' | 'wrapper';
  } = {
    outPath: 'dist/react-components-ssr',
    type: 'server-only',
  },
): OutputTargetCustom => ({
  type: 'custom',
  name: 'react-ssr-library',
  async generator(
    stencilConfig,
    _,
    buildContext: {
      config: {
        flags: { debug?: boolean | null };
        logger: {
          debug: (message: string) => void;
          info: (message: string) => void;
          warn: (message: string) => void;
          error: (message: string) => void;
        };
      };
      createTimeSpan: (name: string, silent?: boolean) => { finish: (message: string) => void };
    },
  ) {
    const { logger, flags } = buildContext.config;

    if (stencilConfig.watch) {
      logger.warn(
        'The react-ssr-library output target does not support watch mode at the moment. Please run `stencil build` instead if you want to generate the React SSR components.',
      );

      return;
    }

    const { rootDir, fsNamespace } = stencilConfig;
    assert(rootDir, 'rootDir is not defined');
    assert(fsNamespace, 'fsNamespace is not defined');

    const { debug } = flags;
    const timespan = buildContext.createTimeSpan(`generate react started`, true);

    const outputDir = path.join(rootDir, config.outPath ?? '');
    const distDir = path.join(outputDir, 'dist');
    const esmDir = path.join(distDir, 'esm');
    const typesDir = path.join(distDir, 'types');
    const componentsPrefix = fsNamespace.split('-').shift() ?? '';

    rmSync(distDir, { recursive: true, force: true });
    mkdirSync(path.join(esmDir, 'components'), { recursive: true });

    const compiler = await createCompiler({
      ...stencilConfig,
      outputTargets: [
        { type: 'dist-custom-elements', dir: path.join(esmDir, 'components') },
        { type: 'dist-hydrate-script', empty: true, dir: path.join(esmDir, 'hydrate') },
      ],
    });
    await compiler.build();
    await compiler.destroy();
    cpSync(path.join(rootDir, 'dist', 'types'), typesDir, { recursive: true });
    rmSync(path.join(esmDir, 'hydrate', 'package.json'), { force: true });

    writeFileSync(
      path.join(__dirname, 'lib', 'client', 'index.ts'),
      readFileSync(path.join(__dirname, 'scripts', 'templates', 'lib.client.index.ts'), 'utf-8')
        .toString()
        .replace(
          /__PASCAL_CASE_COMPONENTS_PREFIX__/g,
          componentsPrefix.replace(/(^\w|-\w)/g, (text: string) => text.replace(/-/, '').toUpperCase()),
        )
        .replace(/\/\/ @ts-expect-error - leads only to error in template file\n/g, '')
        .replace(/\/\* eslint-disable \*\/\n/g, ''),
    );

    exec(
      'tsx',
      [path.join(__dirname, 'scripts', 'build.ts'), '--dist-root', esmDir, '--components-prefix', componentsPrefix],
      !!debug,
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
      !!debug,
    );

    await esbuild.build({
      entryPoints: [path.join(esmDir, '*.js'), path.join(esmDir, '**', '*.js'), path.join(esmDir, '**', '**', '*.js')],
      format: 'cjs',
      logLevel: 'error',
      outdir: path.join(distDir, 'cjs'),
    });

    createPackageJson(outputDir, config.type === 'server-only', config.package ?? {});

    timespan.finish(`generate react finished`);
  },
});

const exec = (command: string, args: string[], debug = false) => {
  const { error } = spawnSync(command, args, { stdio: debug ? 'inherit' : 'ignore' });
  if (error) {
    throw error;
  }
};

type PackageJsonConfig = {
  name?: string;
  version?: string;
  author?: string;
  license?: string;
};
type PackageJson = PackageJsonConfig & { dependencies: Record<string, string> };

const createPackageJson = (
  outputDir: string,
  patchStencil = false,
  { author = 'Stencil React SSR', license = 'ISC', name = 'stencil-react-ssr', version = '0.0.0' }: PackageJsonConfig,
) => {
  const outputPackageJsonPath = path.join(outputDir, 'package.json');
  const require = createRequire(__filename);
  const templatePackageJson = require(path.join(__dirname, 'scripts', 'templates', 'package.json')) as PackageJson;

  if (existsSync(outputPackageJsonPath)) {
    const currentPackageJson = require(outputPackageJsonPath) as PackageJson;
    writeFileSync(outputPackageJsonPath, JSON.stringify(Object.assign(templatePackageJson, currentPackageJson), null, 2));
  } else {
    templatePackageJson.name = name;
    templatePackageJson.version = version;
    templatePackageJson.author = author;
    templatePackageJson.license = license;

    if (patchStencil) {
      templatePackageJson.dependencies.linkedom = '0.16.1';
      templatePackageJson.dependencies['@stencil/core'] = 'github:smartive/stencil-patched#v4.19.2';
    } else {
      templatePackageJson.dependencies['@stencil/core'] = '^4.19.2';
    }

    writeFileSync(outputPackageJsonPath, JSON.stringify(templatePackageJson, null, 2));
  }
};
