import { Section } from './section';
import Link from 'next/link';
import { FC } from 'react';

export const Navigation: FC = () => (
  <Section
    title="Navigation"
    variants={[
      {
        title: 'Meta',
        children: (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/storybook/index.html">Storybook</Link>
            </li>
          </ul>
        ),
      },
      {
        title: 'Test Server Only Approach',
        children: (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link href="/test/50">50 Elements</Link>
            </li>
            <li>
              <Link href="/test/100">100 Elements</Link>
            </li>
            <li>
              <Link href="/test/200">200 Elements</Link>
            </li>
            <li>
              <Link href="/test/500">500 Elements</Link>
            </li>
          </ul>
        ),
      },
      {
        title: 'Todo App',
        children: (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link href="/todo/wrapper">Wrapper Approach</Link>
            </li>
            <li>
              <Link href="/todo/server-only">Server Only Approach</Link>
            </li>
          </ul>
        ),
      },
    ]}
  />
);
