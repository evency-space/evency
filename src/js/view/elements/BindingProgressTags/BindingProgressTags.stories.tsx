import React from "react";
import { ComponentStory } from "@storybook/react";
import { BindingProgressTags } from "./BindingProgressTags";
import { LIST_POINT_UNITS } from "../../../interfaces";

export default {
  title: "elements/BindingProgressTags",
  component: BindingProgressTags,
  args: {
    progressCount: 0,
    totalCount: 0,
    unit: LIST_POINT_UNITS.kilogram,
  },
};

const Template: ComponentStory<typeof BindingProgressTags> = (args) => (
  <BindingProgressTags {...args} />
);

export const Primary = Template.bind({});

export const WithBigCount = Template.bind({});
WithBigCount.args = {
  progressCount: 10000,
  totalCount: 20000000,
};
