import type { Metadata } from 'next';
import './styles.css';
import { Navigation } from '../navigation';
import { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = { title: 'Todo - Next.js ABC Web Components App' };

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Navigation />
    <div id="todo">{children}</div>
  </>
);

export default Layout;
