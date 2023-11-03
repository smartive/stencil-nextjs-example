import type { Meta, StoryObj } from '@storybook/react';
import { AbcDropdown, AbcFlyout, AbcFlyoutItem } from 'abc-web-components-react-wrapper';

const meta = {
  title: 'Example/AbcDropdown',
  component: AbcDropdown,
  argTypes: {
    onDropdownChange: {
      action: 'onDropdownChange',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AbcDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <AbcFlyout>
        <AbcFlyoutItem item="item-1" label="Item 1" />
        <AbcFlyoutItem item="item-2" label="Item 2" />
        <AbcFlyoutItem item="item-3" label="Item 3" />
        <AbcFlyoutItem item="item-4" label="Item 4" />
      </AbcFlyout>
    ),
  },
};
