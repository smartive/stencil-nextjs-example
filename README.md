# Stencil within Next.js App Router Project

This project demonstrates two approaches for integrating Stencil Web Components into a Next.js app directory.

## Key Considerations

- **Customization**: This project is tailored to our client's specific use case, so modifications might be necessary for broader applicability. We welcome collaboration and contributions to enhance its accessibility.

- **Cautiousness**: Both approaches have potential security concerns. Exercise caution, especially when using user-generated content.

## Approaches

### Server-Side Rendering with Wrapper

- Leverages linkedom to emulate browser functionality on the server for component rendering.
- Credits:
  - [Wesley Luyten's WeSC project](https://github.com/luwes/wesc) served as a foundation.
  - Mux's Web Components React [build script](https://github.com/muxinc/media-chrome/blob/main/scripts/react/build.js) aided in creating the Stencil React Wrapper.
- Considerations:
  - Uses a [custom Stencil fork](https://github.com/smartive/stencil-patched)) to enable globalThis fallback in server-side environments.
  - A related [pull request](https://github.com/ionic-team/stencil/pull/4917) and [issue](https://github.com/ionic-team/stencil/issues/4916) for official support were closed by the Stencil team.

#### Code

1. Add `await import('abc-web-components-react-wrapper/server');` to your root `layout.tsx` and consider adding a polyfill for template-shadowroot since Firefox just (begining of 2024) started to support it.
1. Create a new `'use client'` component
1. Use the generated Wrapper to wrap your generated React Web Component:
```TSX
'use client';

// ...

export const ButtonWithWrapper: FC<PropsWithChildren> = ({ children }) => (
  <AbcWrapper>
    <AbcButton variant="primary" size="md" as="button" onClick={(event) => console.info(event)}>
      {children}
    </AbcButton>
  </AbcWrapper>
);
```
1. Use your component in `page.tsx`

### Server-Side Static Rendering with Client-Side Hydration

- Pre-renders static HTML and CSS with Stencil's Hydrate App feature on the server.
- Sends the static content to the client.
- The browser replaces the placeholder with an interactive version of the component.

**Warning**

This approach introduces potential XSS vulnerabilities. Never render user-generated content inside Web Components.

#### Code

This approach is a little more complicated since it uses the React Server Component approach which allows to run async code server side but not client side. Furthermore it relies on the possability to pass client components into server components as children and vice versa.

1. Create two components one is for RSC usage and the other is the one rendered on the client:
RSC:
```TSX
// ...

export const ButtonRSC: FC<PropsWithChildren> = ({ children }) => (
  <ButtonWithRSC rsc={<AbcButtonServerOnly>{children}</AbcButtonServerOnly>}>{children}</ButtonWithRSC>
);
```
Client:
```TSX
'use client';

// ...

export const ButtonWithRSC: FC<Props> = ({ rsc, children }) => (
  <WithRSCFallback rsc={rsc}>
    <AbcButton variant="primary" size="md" as="button" onClick={(event) => console.info(event)}>
      {children}
    </AbcButton>
  </WithRSCFallback>
);

```
1. Use the `ButtonRSC` component in `page.tsx`

## Testing and Demonstration

1. Live Demo: [stencil-nextjs-example-app.vercel.app](stencil-nextjs-example-app.vercel.app)
1. Local Setup:
   - Install dependencies: `npm ci`
   - Start development server: `npm run app:dev`
   - Build for production: `npm run app:start`
   - Access live site: [http://localhost:3000](http://localhost:3000)

Disable JavaScript in the browser's dev tools and reload the page to see the difference between the rendered components.
