import React from "react";
import { ComponentStory } from "@storybook/react";

import { CommonListPointViewOptions } from "./CommonListPointViewOptions";

export default {
  title: "pages/settings/CommonListPointViewOptions",
  component: CommonListPointViewOptions,
};

const Template: ComponentStory<typeof CommonListPointViewOptions> = () => (
  <CommonListPointViewOptions />
);

export const Primary = Template.bind({});
