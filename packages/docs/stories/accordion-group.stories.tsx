import type { Meta, StoryObj } from '@storybook/react';
import { AbcAccordion, AbcAccordionGroup } from 'abc-web-components-react-wrapper';

const meta = {
  title: 'Example/AbcAccordionGroup',
  component: AbcAccordionGroup,
  argTypes: {
    onAccordionChange: {
      action: 'onAccordionChange',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AbcAccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <>
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
      </>
    ),
  },
};
