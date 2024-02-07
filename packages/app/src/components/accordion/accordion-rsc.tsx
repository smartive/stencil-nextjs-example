import { AbcAccordionGroupServerOnly, staticAbcAccordionHtmlServerOnly } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { AccordionWithRSC } from './accordion-with-rsc';
import { data } from './data';

export const AccordionRSC: FC = async () => {
  const accordions = await Promise.all(
    data.map(({ item, summary }) =>
      staticAbcAccordionHtmlServerOnly({ slot: 'accordions', item, summary, variant: 'white' }),
    ),
  );

  return <AccordionWithRSC rsc={<AbcAccordionGroupServerOnly>{accordions.join('')}</AbcAccordionGroupServerOnly>} />;
};
