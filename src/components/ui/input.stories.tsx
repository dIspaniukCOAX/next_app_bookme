import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    type: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Placeholder',
        type: 'text',
    },
};

export const Password: Story = {
    args: {
        placeholder: 'Password',
        type: 'password',
    },
};

export const Email: Story = {
    args: {
        placeholder: 'Email',
        type: 'email',
    },
};

export const Number: Story = {
    args: {
        placeholder: 'Number',
        type: 'number',
    },
};

export const Date: Story = {
    args: {
        placeholder: 'Date',
        type: 'date',
    },
};

