import React from "react";
import { ComponentStory } from "@storybook/react";

import { Checkbox } from "./Checkbox";

export default {
  title: "elements/inputs/Checkbox",
  component: Checkbox,
};

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Checked = Template.bind({});
Checked.args = {
  value: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: <span>checkbox label</span>,
  value: false,
};
