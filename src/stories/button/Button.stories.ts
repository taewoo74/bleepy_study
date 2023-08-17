import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

// const meta = {
//   title: 'Example/Button',
//   component: Button,
//   argTypes: {
//     loading: {
//       table: {
//         category: 'state',
//       },
//     },
//     disabled: {
//       table: {
//         category: 'state',
//       },
//     },
//     active: {
//       table: {
//         category: 'state',
//       },
//     },
//     focused: {
//       table: {
//         category: 'state',
//       },
//     },
//     hovered: {
//       table: {
//         category: 'state',
//       },
//     },
//     classname: {
//       table: {
//         category: 'styled',
//       },
//     },
//     backgroundColor: {
//       table: {
//         category: 'styled',
//       },
//     },
//     size: {
//       table: {
//         category: 'styled',
//       },
//     },
//     label: {
//       table: {
//         category: 'styled',
//       },
//     },
//     onClick: {
//       table: {
//         category: 'action',
//       },
//     },
//   },
// } satisfies Meta<typeof Button>;

// type Story = StoryObj<typeof meta>;

const defaultArgs: ButtonProps = {
  loading: false,
  disabled: false,
  focused: false,
  hovered: false,
  classname: '',
  size: 'medium',
  label: '확인',
  backgroundColor: '#0060ce',
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
  args: { ...defaultArgs, backgroundColor: '#eb7d00' },
};

export const color_Danger: Story = {
  args: { ...defaultArgs, backgroundColor: '#ff3232' },
};

export const loading_button: Story = {
  args: { ...defaultArgs, loading: true },
};

export const disable_button: Story = {
  args: { ...defaultArgs, disabled: true },
};

export const focuse_button: Story = {
  args: { ...defaultArgs, focused: true },
};

export const hover_button: Story = {
  args: { ...defaultArgs, hovered: true },
};

// loading = false,
// disabled = false,
// active = false,
// focused = false,
// hovered = false,

// // More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// const meta = {
//   title: 'Example/Button',
//   component: Button,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
//     layout: 'centered',
//   },
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//   tags: ['autodocs'],
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } satisfies Meta<typeof Button>;

// export meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

// 크기 컬러 색상 그림 disable
// 색상은 넣어주는값 받아서 사용

// size 1~10
// box-shadow true false
// round 1~10
// label 그림
