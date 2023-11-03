/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Next.js ABC Web Components App',
  description: 'This Next.js App demonstrates how to use the ABC Web Components.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await import('abc-web-components-react-wrapper/server');

  return (
    <html lang="en">
      <body
        style={{
          width: '50rem',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <noscript>Please enable JavaScript to view this website. Especially if you use Firefox.</noscript>
        {children}
        <Script src="./scripts/polyfills/template-shadowroot.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
