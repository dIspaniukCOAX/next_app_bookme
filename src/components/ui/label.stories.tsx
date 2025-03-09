import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    children: { control: "text" }
  }
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label"
  }
} satisfies Story;
