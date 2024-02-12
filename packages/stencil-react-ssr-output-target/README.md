# `@smartive/stencil-react-ssr-output-target`

`reactSSROutputTarget` is a Stencil output target plugin used to generate server-side rendered (SSR) versions of your Stencil Web Components for integration within React applications escpecially with Next.js. This allows you to improve initial page load performance and SEO of your React app.

## Arguments and Defaults
The reactSSROutputTarget function accepts a single argument, a configuration object with the following optional properties:

| Property | Type | Description | Default |
|---|---|---|---|
| `outPath` | `string` | Path to the output directory for generated files. | `'dist/react-components-ssr'` |
| `type` | `'server-only'` or `'wrapper'` | Type of output to generate. | `'server-only'` |
| `package` | `PackageJsonConfig` | Configuration for the generated `package.json` file. | see next rows |
| └ `name` | `string` | Name of the package. | `'@smartive/stencil-react-ssr-output-target'` |
| └ `version` | `string` | Version of the package. | `'0.0.0'` |
| └ `author` | `string` | Author of the package. | `'Stencil'` |
| └ `license` | `string` | License of the package. | `'ISC'` |

'server-only': Generates standalone Server Components for use with Next.js.
'wrapper': Generates components wrapped for server-side rendering with linkedom.

## Usage Example
```TypeScript
import { Config } from '@stencil/core';
import { reactSSROutputTarget } from '@smartive/stencil-react-ssr-output-target';

export const config: Config = {
  namespace: 'my-awesome-web-components',
  outputTargets: [
    reactSSROutputTarget({
      package: {
        name: 'my-awesome-react-wrapped-components',
        version: '1.2.3',
      },
      outPath: 'build/ssr',
      type: 'wrapper',
    });
  ],
};
```

This will generate server-side rendered versions of your Stencil components within the build/ssr directory and create a package.json file with the specified name and version. The wrapper approach is used in this example.

**Use generated code with caution.**

## Additional Notes
The generated components can be imported and used directly in your React application.

Remember to follow security best practices when dealing with user-generated content within server-side components.

### Usage of generated Code

see [smartive/stencil-nextjs-example](https://github.com/smartive/stencil-nextjs-example/tree/main/packages/app/src)
