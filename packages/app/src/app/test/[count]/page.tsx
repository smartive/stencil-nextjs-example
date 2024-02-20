import { Navigation } from '@/app/navigation';
import { AccordionRSC } from '@/components/accordion/accordion-rsc';
import { ButtonRSC } from '@/components/button/button-rsc';
import { DropdownRSC } from '@/components/dropdown/dropdown-rsc';
import { notFound, redirect } from 'next/navigation';
import { FC } from 'react';
import { Section } from '../../section';

export const generateStaticParams = () => [{ count: '50' }, { count: '100' }, { count: '200' }, { count: '500' }];

const Page: FC<{ params: { count: string } }> = ({ params: { count: rawCount } }) => {
  const count = parseInt(rawCount);

  if (isNaN(count)) {
    redirect('/test/50');
  }

  if (count > 500) {
    notFound();
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Navigation />
      <header>
        <h1>Test Server Only Approach</h1>
        <p>Components count: {count}</p>
      </header>
      {Array.from({ length: count }).map((_, index) => (
        <Section
          key={index}
          title={`Section ${index + 1}`}
          variants={[
            { title: 'Button', children: <ButtonRSC>Button</ButtonRSC> },
            { title: 'Accordion', children: <AccordionRSC /> },
            { title: 'Dropdown', children: <DropdownRSC text="Dropdown" hint="Hint" label="Label" /> },
          ]}
        />
      ))}
    </main>
  );
};

export default Page;
