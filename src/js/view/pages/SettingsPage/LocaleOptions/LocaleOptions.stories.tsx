import React from "react";
import { ComponentStory } from "@storybook/react";

import { LocaleOptions } from "./LocaleOptions";

export default {
  title: "pages/settings/LocaleOptions",
  component: LocaleOptions,
};

const Template: ComponentStory<typeof LocaleOptions> = () => <LocaleOptions />;

export const Primary = Template.bind({});
