import React from "react";
import { ComponentStory } from "@storybook/react";
import { FavoriteToggle } from "./FavoriteToggle";

export default {
  title: "elements/FavoriteToggle",
  component: FavoriteToggle,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

const Template: ComponentStory<typeof FavoriteToggle> = (args) => (
  <FavoriteToggle {...args} />
);

export const Primary = Template.bind({});

export const Filled = Template.bind({});
Filled.args = {
  isFavorite: true,
};
