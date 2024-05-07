import React from "react";
import { ComponentStory } from "@storybook/react";
import { SelectedFavoritesButton } from "./SelectedFavoritesButton";

export default {
  title: "pages/favorite/SelectedFavoritesButton",
  component: SelectedFavoritesButton,
};

const Template: ComponentStory<typeof SelectedFavoritesButton> = (args) => (
  <SelectedFavoritesButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  count: 10,
};

export const WithZeroCount = Template.bind({});
