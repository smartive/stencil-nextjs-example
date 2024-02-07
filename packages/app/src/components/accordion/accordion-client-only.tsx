'use client';

import { AbcAccordion, AbcAccordionGroup } from 'abc-web-components-react-wrapper';
import { FC } from 'react';
import { data } from './data';

export const AccordionClientOnly: FC = () => (
  <AbcAccordionGroup onAccordionChange={(event) => console.info(event.detail)}>
    {data.map(({ item, summary, details }) => (
      <AbcAccordion
        key={item}
        slot="accordions"
        item={item}
        summary={summary}
        variant="white"
        onAccordionClick={({ detail }) => console.info(detail)}
      >
        <span slot="details">{details}</span>
      </AbcAccordion>
    ))}
  </AbcAccordionGroup>
);
