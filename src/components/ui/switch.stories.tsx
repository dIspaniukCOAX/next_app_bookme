import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "onChange" }
  }
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false
  }
};
