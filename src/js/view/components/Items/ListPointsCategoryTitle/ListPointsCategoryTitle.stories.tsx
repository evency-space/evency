import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointsCategoryTitle } from "./ListPointsCategoryTitle";
import { LIST_POINT_CATEGORIES } from "../../../../interfaces";

export default {
  title: "components/ListPoint/ListPointsCategoryTitle",
  component: ListPointsCategoryTitle,
};

const Template: ComponentStory<typeof ListPointsCategoryTitle> = (args) => (
  <ListPointsCategoryTitle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  categoryTitle: LIST_POINT_CATEGORIES.clothes,
};

export const DisableCategoryAddButton = Template.bind({});
DisableCategoryAddButton.args = {
  categoryTitle: LIST_POINT_CATEGORIES.entertainment,
  disableCategoryAddButton: true,
};
