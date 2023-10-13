import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js ABC Web Components App',
  description: 'This Next.js App demonstrates how to use the ABC Web Components.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        {children}
      </body>
    </html>
  );
}
