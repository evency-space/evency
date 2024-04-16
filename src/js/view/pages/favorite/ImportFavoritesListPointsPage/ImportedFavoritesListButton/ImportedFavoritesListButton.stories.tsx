import React from "react";
import { ComponentStory } from "@storybook/react";
import { ImportedFavoritesListButton } from "./ImportedFavoritesListButton";

export default {
  title: "pages/ImportFavoritesListPointsPage/ImportedFavoritesListButton",
  component: ImportedFavoritesListButton,
};

const Template: ComponentStory<typeof ImportedFavoritesListButton> = (args) => (
  <ImportedFavoritesListButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  count: 10,
};

export const WithZeroCount = Template.bind({});
