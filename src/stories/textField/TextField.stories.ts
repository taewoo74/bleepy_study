import { Meta, StoryObj } from '@storybook/react';
import { TextField, TextFieldType } from './TextField';

const meta = {
  title: 'Example/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextField>;
//해당 표현식의 결과 유형을 변경하지 않고 표현식 유형이 일부 유형과 일치하는지 확인합니다.

const defaultArgs: TextFieldType = {
  title: 'title',
  titleSize: 'l',
  title_sub: false,
  type: 'Outlined',
  subIcon: false,
  size: 'l',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const boxsize_s: Story = {
  args: { ...defaultArgs, size: 's' },
};

export const boxsize_m: Story = {
  args: { ...defaultArgs, size: 'm' },
};

export const boxsize_l: Story = {
  args: { ...defaultArgs, size: 'l' },
};

export const boxsize_xl: Story = {
  args: { ...defaultArgs, size: 'xl' },
};

export const title_on: Story = {
  args: { ...defaultArgs, title: 'title', title_sub: true },
};

export const error: Story = {
  args: {
    ...defaultArgs,
    title: 'title',
    title_sub: true,
    states: 'error',
    subIcon: true,
    subTextType: 'error',
    subtextSize: 'm',
    subText: '에러입니다.',
  },
};

export const disable: Story = {
  args: {
    ...defaultArgs,
    title: 'title',
    states: 'disabled',
  },
};

export const focus: Story = {
  args: {
    ...defaultArgs,
    title: 'title',
    states: 'focus',
    title_sub: true,
  },
};

export const text_sub: Story = {
  args: {
    ...defaultArgs,
    title: 'title',
    title_sub: true,
    subTextType: 'normal',
    subText: '8글자 이상 작성해 주세요',
    subtextSize: 'm',
  },
};
