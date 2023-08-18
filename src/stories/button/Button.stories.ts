import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

const defaultArgs: ButtonProps = {
  loading: false,
  disabled: false,
  classname: '',
  size: 'medium',
  theme: 'default',
  label: '확인',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const size_medium: Story = {
  args: { ...defaultArgs },
};

export const size_small: Story = {
  args: { ...defaultArgs, size: 'small' },
};

export const size_large: Story = {
  args: { ...defaultArgs, size: 'large' },
};

export const color_warning: Story = {
  args: { ...defaultArgs, theme: 'warning' },
};

export const color_Danger: Story = {
  args: { ...defaultArgs, theme: 'danger' },
};

export const loading_button: Story = {
  args: { ...defaultArgs, loading: true },
};

export const disable_button: Story = {
  args: { ...defaultArgs, disabled: true },
};
