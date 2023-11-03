import {
  AbcAccordion,
  AbcAccordionGroup,
} from "abc-web-components-react-wrapper";
import React, { FC } from "react";

export const Accordion: FC = () => (
  <AbcAccordionGroup onAccordionChange={(event) => console.info(event.detail)}>
    <AbcAccordion
      slot="accordions"
      item="first"
      summary="Placeholder 1"
      variant="white"
    >
      <span slot="details">
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus.
      </span>
    </AbcAccordion>
    <AbcAccordion
      slot="accordions"
      item="second"
      summary="Placeholder 2"
      variant="white"
    >
      <span slot="details">
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus.
      </span>
    </AbcAccordion>
    <AbcAccordion
      slot="accordions"
      item="third"
      summary="Placeholder 3"
      variant="white"
    >
      <span slot="details">
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus.Norem ipsum dolor sit
        amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est
        a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
        sollicitudin lacusNorem ipsum dolor sit amet, consectetur adipiscing
        elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
        dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
      </span>
    </AbcAccordion>
    <AbcAccordion
      slot="accordions"
      item="fourth"
      summary="Placeholder 4"
      variant="white"
    >
      <span slot="details">
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus.Norem ipsum dolor sit
        amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est
        a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
        sollicitudin lacusNorem ipsum dolor sit amet, consectetur adipiscing
        elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
        dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
      </span>
    </AbcAccordion>
    <AbcAccordion
      slot="accordions"
      item="fifth"
      summary="Placeholder 5"
      variant="white"
    >
      <span slot="details">
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus.Norem ipsum dolor sit
        amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est
        a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
        sollicitudin lacusNorem ipsum dolor sit amet, consectetur adipiscing
        elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
        dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
      </span>
    </AbcAccordion>
  </AbcAccordionGroup>
);
