import { AccordionClientOnly } from '@/components/accordion/accordion-client-only';
import { AccordionRSC } from '@/components/accordion/accordion-rsc';
import { AccordionWithWrapper } from '@/components/accordion/accordion-with-wrapper';
import { ButtonClientOnly } from '@/components/button/button-client-only';
import { ButtonRSC } from '@/components/button/button-rsc';
import { ButtonWithWrapper } from '@/components/button/button-with-wrapper';
import { DropdownClientOnly } from '@/components/dropdown/dropdown-client-only';
import { DropdownRSC } from '@/components/dropdown/dropdown-rsc';
import { DropdownWithWrapper } from '@/components/dropdown/dropdown-with-wrapper';
import { listItems } from '@/components/list/data';
import { ListClientOnly } from '@/components/list/list-client-only';
import { ListRSC } from '@/components/list/list-rsc';
import { ListWithWrapper } from '@/components/list/list-with-wrapper';
import { FC } from 'react';
import { Navigation } from './navigation';
import { Section } from './section';

const Page: FC = () => (
  <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Navigation />
    <Section
      title="List"
      variants={[
        { title: 'RSC', children: <ListRSC items={listItems} /> },
        { title: 'Wrapper', children: <ListWithWrapper items={listItems} /> },
        { title: 'Client Only', children: <ListClientOnly items={listItems} /> },
      ]}
    />
    <Section
      title="Buttons"
      variants={[
        { title: 'RSC', children: <ButtonRSC>Button</ButtonRSC> },
        { title: 'Wrapper', children: <ButtonWithWrapper>Button</ButtonWithWrapper> },
        { title: 'Client Only', children: <ButtonClientOnly>Button</ButtonClientOnly> },
      ]}
    />
    <Section
      title="Accordion"
      variants={[
        { title: 'RSC', children: <AccordionRSC /> },
        { title: 'Wrapper', children: <AccordionWithWrapper /> },
        { title: 'Client Only', children: <AccordionClientOnly /> },
      ]}
    />
    <Section
      title="Dropdown"
      variants={[
        { title: 'RSC', children: <DropdownRSC text="Dropdown" hint="Hint" label="Label" /> },
        { title: 'Wrapper', children: <DropdownWithWrapper text="Dropdown" hint="Hint" label="Label" /> },
        { title: 'Client Only', children: <DropdownClientOnly text="Dropdown" hint="Hint" label="Label" /> },
      ]}
    />
  </main>
);

export default Page;
