# Stencil Output Targets for Next.js SSR

This package exports `reactSSROutputTarget`, which is a [Stencil Output Target](https://stenciljs.com/docs/output-targets) plugin. It wraps Stencil components within React components that can be used within the [Next.js App Router](https://nextjs.org/docs/app). This allows you to improve the initial page load performance and SEO of your Next.js app.

## Usage

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

### Arguments and Defaults

| Property    | Type                           | Description                                                                                                                                                                                | Default                                       |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `outPath`   | `string`                       | Path to the output directory for generated files.                                                                                                                                          | `'dist/react-components-ssr'`                 |
| `type`      | `'server-only'` or `'wrapper'` | Type of output to generate.<br><br>`'server-only'` generates React Server Components for use with Next.js app folder.<br>`'wrapper'` generates components which can be used in client components and are server side rendered with [linkedom](https://github.com/WebReflection/linkedom#readme).<br><br>More Information see [Approaches](#approaches) and [Usage of generated Code](#usage-of-generated-code) | `'server-only'`                               |
| `package`   | `PackageJsonConfig`            | Configuration for the generated `package.json` file.                                                                                                                                       | see next rows                                 |
| └ `name`    | `string`                       | Name of the package.                                                                                                                                                                       | `'stencil-react-ssr'` |
| └ `version` | `string`                       | Version of the package.                                                                                                                                                                    | `'0.0.0'`                                     |
| └ `author`  | `string`                       | Author of the package.                                                                                                                                                                     | `'Stencil React SSR'`                                   |
| └ `license` | `string`                       | License of the package.                                                                                                                                                                    | `'ISC'`                                       |

## Usage of generated Code

> **This package is experimental and not yet tested with all use cases. Use generated code with caution.**

You can use the generated components in three ways:
1. Fully SSR supported React components with client rehydration (`wrapper`)
2. Prerendered SSR components with client rehydration (`ssr-only`)
3. Client components only (`wrapper` with `use client`).

### 1. `'wrapper'` approach

1. Add `await import('abc-web-components-react-wrapper/server');` to your root `layout.tsx`. Consider adding a polyfill for [template-shadowroot](https://github.com/webcomponents/template-shadowroot#readme). Consolidate [caniuse](https://caniuse.com/mdn-html_elements_template_shadowrootmode) to determine if the polyfill is necessary.
1. Create a new `'use client'` component
1. Use the generated Wrapper to wrap your generated React Web Component:

```TSX
'use client';

import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { AbcButton } from 'abc-web-components-react-wrapper';
import { FC, PropsWithChildren } from 'react';

export const ButtonWithWrapper: FC<PropsWithChildren> = ({ children }) => (
  <AbcWrapper>
    <AbcButton variant="primary" size="md" as="button" onClick={(event) => console.info(event)}>
      {children}
    </AbcButton>
  </AbcWrapper>
);
```

1. Use your component in `page.tsx`

### 2. `'server-only'` approach

This approach is a little more complicated since it uses the React Server Component approach which allows to run async code server side but not client side. Furthermore it relies on the possability to pass client components into server components as children and vice versa.

1. Create two components one is for SSR usage and the other is the one rendered on the client:
   SSR:

```TSX
import { AbcButtonServerOnly } from 'abc-web-components-react-wrapper';
import { FC, PropsWithChildren } from 'react';
import { ButtonWithSSR } from './button-with-ssr';

export const ButtonSSR: FC<PropsWithChildren> = ({ children }) => (
  <ButtonWithSSR fallback={<AbcButtonServerOnly>{children}</AbcButtonServerOnly>}>{children}</ButtonWithSSR>
);
```

Client:

```TSX
'use client';

import { AbcButton, WithSSR } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ComponentProps<typeof WithSSR>>;

export const ButtonWithSSR: FC<Props> = ({ fallback, children }) => (
  <WithSSR fallback={fallback}>
    <AbcButton variant="primary" size="md" as="button" onClick={(event) => console.info(event)}>
      {children}
    </AbcButton>
  </WithSSR>
);

```

1. Use the `ButtonSSR` component in `page.tsx`

### 3. `'use client'` approach

1. Create a new `'use client'` component
1. Use generated React Web Component:

```TSX
'use client';

import { AbcButton } from 'abc-web-components-react-wrapper';
import { FC, PropsWithChildren } from 'react';

export const ButtonWithWrapper: FC<PropsWithChildren> = ({ children }) => (
  <AbcButton variant="primary" size="md" as="button" onClick={(event) => console.info(event)}>
    {children}
  </AbcButton>
);
```

1. Use your component in `page.tsx`

> [!NOTE]
> The `'use client'` approach is the simplest to implement but has the worst initial load times and SEO impact.

### Working Next.js Example

**Live Demo**: [stencil-nextjs-example-app.vercel.app](stencil-nextjs-example-app.vercel.app)

**Code**: [smartive/stencil-nextjs-example](https://github.com/smartive/stencil-nextjs-example/tree/main/packages/app)

## Approaches

### Key Considerations

**Customization**: This project is tailored to our client's specific use case, so modifications might be necessary for broader applicability. We welcome collaboration and contributions to enhance its accessibility.

**Cautiousness**: Both of the following approaches have potential security concerns. Exercise caution, especially when using user-generated content.

### Server-Side Rendering with Wrapper (`'wrapper'` approach)

This approach utilizes [linkedom](https://github.com/WebReflection/linkedom#readme), a library that emulates browser-like functionality on the server-side, to render Stencil components directly. This allows for faster initial page loads and improved SEO compared to client-side rendering.

#### Additional Information

- Uses a [custom Stencil fork](https://github.com/smartive/stencil-patched) to enable `globalThis` fallback in server-side environments.
- A related [pull request](https://github.com/ionic-team/stencil/pull/4917) and [issue](https://github.com/ionic-team/stencil/issues/4916) for official support were closed by the Stencil team.

### Generating Static HTML with Client-Side Hydration (`'server-only'` approach)

This approach uses Stencil's "Hydrate App" feature to generate fully pre-rendered HTML and CSS files on the server, leading to faster initial page loads and improved SEO. The server sends this static content to the client, which subsequently replaces the static HTML with interactive versions of the Stencil components.

**However, be aware of a potential security risk**: This approach introduces potential Cross-Site Scripting (XSS) vulnerabilities because the server renders the HTML before knowing what data will be displayed. To mitigate this risk, never render user-generated content directly inside Web Components generated using this method.

#### Additional Information

This approach offers fast initial load times but requires client-side JavaScript execution for full interactivity.
Consider alternative approaches like "wrapper" or "use client" if your application heavily relies on user-generated content or requires immediate interactivity.
Always prioritize security and sanitize any user input before using it within Web Components.

### Comparison Table

| **Approach**              | **Advantages**                                                                                                                                                                                                                                                                                                                                                                  | **Disadvantages**                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`'wrapper'`**           | <ul> <li> Isolates components for modularity and CSS control. </li> <li> Maintains SEO benefits with pre-rendered content. </li> <li> Prevents layout shifts for a seamless experience. </li> <li> Simple integration compared to `'server-only'`. </li> <li> Functionally remains after client-side hydration. </li> <li> Avoids CSS conflicts with global styles. </li> </ul> | <ul> <li> Content rendered on request (not pre-rendered). </li> <li> Custom server-side rendering implementation. </li> <li> Potential memory issues in constrained environments. </li> </ul>                                                                                                                                                                                                  |
| **`'server-only'`**       | <ul> <li> Leverages built-in Stencil rendering for speed. </li> <li> Pre-rendered content for SEO and fast display. </li> </ul>                                                                                                                                                                                       | <ul> <li> Potential XSS risk with dynamic content.</li> <li> Complex setup with React server components. </li> <li> Increases bundle size with redundant CSS. </li> <li> Limited user input (text only). </li> <li> Memory issues with large component counts. </li> <li> Client-side re-render with possible layout shift. </li> <li> Global CSS conflicts with component styles. </li> </ul> |
| **Client-Side Rendering** | <ul> <li> Simple implementation with minimal code. </li> <li> Delivers fastest initial load times. </li> </ul>                                                                                                                                                                                                                                                                  | <ul> <li> Triggers layout shifts during initial rendering. </li> <li> Content invisible to search engines (SEO impact). </li> </ul>                                                                                                                                                                                                                                                            |

### Choosing the right approach

The best approach depends on your project's specific needs and priorities. Consider factors like:

- **SEO**: If search engine visibility is crucial, server-only or wrapper might be better choices.
- **Performance**: Use client offers the fastest initial load times, while server-only and wrapper prioritize smooth rendering.
- **Complexity**: Server-only is the most complex, while use client is the simplest to implement.
- **Memory usage**: Consider memory constraints when choosing an approach.
- **Functionality**: If dynamic content with user input is needed, server-only might not be suitable.
  Remember, carefully evaluate your project's requirements before making a decision.

## Credits

- @luwes [WeSC project](https://github.com/luwes/wesc) served as a foundation.
- @muxinc Web Components React [build script](https://github.com/muxinc/media-chrome/blob/main/scripts/react/build.js) aided in creating the Stencil React Wrapper build script.
