'use client';

import { AbcAccordion, AbcAccordionGroup } from 'abc-web-components-react-wrapper';
import { AbcWrapper } from 'abc-web-components-react-wrapper/client';
import { FC, useEffect, useRef } from 'react';

export const Accordion: FC = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const { current } = ref;
    const onAccordionChange = (event: Event) => console.log((event as CustomEvent<string>)['detail']);
    current?.addEventListener('accordionChange', onAccordionChange);

    return () => current?.removeEventListener('accordionChange', onAccordionChange);
  }, [ref]);

  return (
    <AbcWrapper>
      <AbcAccordionGroup ref={ref}>
        <AbcAccordion slot="accordions" item="first" summary="Placeholder 1" variant="white">
          <span slot="details">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.
          </span>
        </AbcAccordion>
        <AbcAccordion slot="accordions" item="second" summary="Placeholder 2" variant="white">
          <span slot="details">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.
          </span>
        </AbcAccordion>
        <AbcAccordion slot="accordions" item="third" summary="Placeholder 3" variant="white">
          <span slot="details">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.Norem ipsum dolor sit amet, consectetur
            adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
            accumsan, risus sem sollicitudin lacusNorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
          </span>
        </AbcAccordion>
        <AbcAccordion slot="accordions" item="fourth" summary="Placeholder 4" variant="white">
          <span slot="details">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.Norem ipsum dolor sit amet, consectetur
            adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
            accumsan, risus sem sollicitudin lacusNorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
          </span>
        </AbcAccordion>
        <AbcAccordion slot="accordions" item="fifth" summary="Placeholder 5" variant="white">
          <span slot="details">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.Norem ipsum dolor sit amet, consectetur
            adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
            accumsan, risus sem sollicitudin lacusNorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
          </span>
        </AbcAccordion>
      </AbcAccordionGroup>
    </AbcWrapper>
  );
};
