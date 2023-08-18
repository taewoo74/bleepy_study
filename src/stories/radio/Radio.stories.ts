import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioType } from './Radio';

const meta = {
  title: 'Example/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Radio>;

const defaultArgs: RadioType = {
  size: 'l',
  checked: false,
  disable: false,
  readOnly: false,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const size_l: Story = {
  args: { ...defaultArgs, size: 'l' },
};

export const size_l_checked: Story = {
  args: { ...defaultArgs, size: 'l', checked: true },
};

export const size_m: Story = {
  args: { ...defaultArgs, size: 'm' },
};

export const size_m_checked: Story = {
  args: { ...defaultArgs, size: 'm', checked: true },
};

export const size_s: Story = {
  args: { ...defaultArgs, size: 's' },
};

export const size_s_checked: Story = {
  args: { ...defaultArgs, size: 's', checked: true },
};

export const size_xl: Story = {
  args: { ...defaultArgs, size: 'xl' },
};

export const size_xl_checked: Story = {
  args: { ...defaultArgs, size: 'xl', checked: true },
};

export const disabled: Story = {
  args: { ...defaultArgs, disable: true },
};

export const readOnly: Story = {
  args: { ...defaultArgs, readOnly: true },
};
