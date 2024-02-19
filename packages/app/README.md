# ABC App

This application showcases React Web Components generated using a custom output target plugin [stencil-react-ssr-output-target](../stencil-react-ssr-output-target/).

- Demonstrates side-by-side comparisons of different rendering strategies: `'wrapper'`, `'server-only'`, and `'use client';`.
- Provides test pages with varying numbers of components (50, 100, 200, and 500) for performance evaluation.
- Includes a Storybook environment for isolated component exploration.

## Deployment

Live version: https://stencil-nextjs-example-app.vercel.app (`'wrapper'`, `'server-only'`, and `'use client';`)

Test pages (`'server-only'` approach only, for performance evaluation):
- 50 elements: https://stencil-nextjs-example-app.vercel.app/test/50
- 100 elements: https://stencil-nextjs-example-app.vercel.app/test/100
- 200 elements: https://stencil-nextjs-example-app.vercel.app/test/200
- 500 elements: https://stencil-nextjs-example-app.vercel.app/test/500

Storybook: https://stencil-nextjs-example-app.vercel.app/storybook/index.html (`'use client';`)
