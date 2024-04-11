import { AbcAccordionGroupServerOnly, WithSSR, staticAbcAccordionHtmlServerOnly } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { AccordionClientOnly } from './accordion-client-only';
import { data } from './data';

export const AccordionRSC: FC = async () => {
  const accordions = await Promise.all(
    data.map(({ item, summary }) =>
      staticAbcAccordionHtmlServerOnly({ slot: 'accordions', item, summary, variant: 'white' }),
    ),
  );

  return (
    <WithSSR fallback={<AbcAccordionGroupServerOnly>{accordions.join('')}</AbcAccordionGroupServerOnly>}>
      <AccordionClientOnly />
    </WithSSR>
  );
};
