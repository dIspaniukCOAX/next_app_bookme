import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    variant: { control: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"] },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    asChild: { control: "boolean" }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button"
  }
} satisfies Story;

export const Destructive: Story = {
  args: {
    children: "Button",
    variant: "destructive"
  }
} satisfies Story;

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline"
  }
} satisfies Story;

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary"
  }
} satisfies Story;


export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost"
  }
} satisfies Story;

export const Link: Story = {
  args: {
    children: "Button",
    variant: "link"
  }
} satisfies Story;

export const Small: Story = {
  args: {
    children: "Button",
    size: "sm"
  }
} satisfies Story;

export const Large: Story = {
  args: {
    children: "Button",
    size: "lg"
  }
} satisfies Story;

export const Icon: Story = {
  args: {
    children: "🚀",
    size: "icon"
  }
} satisfies Story;
