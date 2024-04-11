import { AccordionClientOnly } from '@/components/accordion/accordion-client-only';
import { AccordionSSR } from '@/components/accordion/accordion-ssr';
import { AccordionWithWrapper } from '@/components/accordion/accordion-with-wrapper';
import { ButtonClientOnly } from '@/components/button/button-client-only';
import { ButtonSSR } from '@/components/button/button-ssr';
import { ButtonWithWrapper } from '@/components/button/button-with-wrapper';
import { DropdownClientOnly } from '@/components/dropdown/dropdown-client-only';
import { DropdownSSR } from '@/components/dropdown/dropdown-ssr';
import { DropdownWithWrapper } from '@/components/dropdown/dropdown-with-wrapper';
import { listItems } from '@/components/list/data';
import { ListClientOnly } from '@/components/list/list-client-only';
import { ListSSR } from '@/components/list/list-ssr';
import { ListWithWrapper } from '@/components/list/list-with-wrapper';
import { AbcListServerOnly } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { Navigation } from './navigation';
import { Section } from './section';

const Page: FC = () => (
  <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Navigation />
    <Section
      title="List"
      variants={[
        {
          title: 'Static',
          children: (
            <>
              <AbcListServerOnly highlightedItem="second" items={listItems} />
              <i>If a component is not interactive, it is possible to render it server-side only.</i>
            </>
          ),
        },
        { title: 'SSR', children: <ListSSR items={listItems} /> },
        { title: 'Wrapper', children: <ListWithWrapper items={listItems} /> },
        { title: 'Client Only', children: <ListClientOnly items={listItems} /> },
      ]}
    />
    <Section
      title="Buttons"
      variants={[
        { title: 'SSR', children: <ButtonSSR>Button</ButtonSSR> },
        { title: 'Wrapper', children: <ButtonWithWrapper>Button</ButtonWithWrapper> },
        { title: 'Client Only', children: <ButtonClientOnly>Button</ButtonClientOnly> },
      ]}
    />
    <Section
      title="Accordion"
      variants={[
        { title: 'SSR', children: <AccordionSSR /> },
        { title: 'Wrapper', children: <AccordionWithWrapper /> },
        { title: 'Client Only', children: <AccordionClientOnly /> },
      ]}
    />
    <Section
      title="Dropdown"
      variants={[
        { title: 'SSR', children: <DropdownSSR text="Dropdown" hint="Hint" label="Label" /> },
        { title: 'Wrapper', children: <DropdownWithWrapper text="Dropdown" hint="Hint" label="Label" /> },
        { title: 'Client Only', children: <DropdownClientOnly text="Dropdown" hint="Hint" label="Label" /> },
      ]}
    />
  </main>
);

export default Page;
