import { FC, ReactNode } from 'react';

export const Section: FC<{ title: string; variants: { title: string; children: ReactNode }[] }> = ({ title, variants }) => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h2>{title}</h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
        gap: '2rem',
      }}
    >
      {variants.map(({ title, children }) => (
        <div key={title}>
          <h3>{title}</h3>
          {children}
        </div>
      ))}
    </div>
    <hr style={{ width: '100%' }} />
  </section>
);
