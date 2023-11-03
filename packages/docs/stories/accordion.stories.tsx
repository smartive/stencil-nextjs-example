import type { Meta, StoryObj } from '@storybook/react';
import { AbcAccordion } from 'abc-web-components-react-wrapper';

const meta = {
  title: 'Example/AbcAccordion',
  component: AbcAccordion,
  argTypes: {
    item: {
      control: {
        type: 'text',
      },
    },
    summary: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['grey', 'white'],
      },
    },
    onAccordionClick: {
      action: 'onAccordionClick',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AbcAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    item: 'first',
    summary: 'Placeholder 1',
    variant: 'white',
    children: (
      <span slot="details">
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
        dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.
      </span>
    ),
  },
};
