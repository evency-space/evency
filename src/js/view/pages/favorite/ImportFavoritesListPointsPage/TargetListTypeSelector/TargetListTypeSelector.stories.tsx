import React from "react";
import { ComponentStory } from "@storybook/react";
import { TargetListTypeSelector } from "./TargetListTypeSelector";

export default {
  title: "pages/favorite/ImportFavoritesListPointsPage/TargetListTypeSelector",
  component: TargetListTypeSelector,
  args: {
    selectedList: "common",
    selectList: () => {},
  },
};

const Template: ComponentStory<typeof TargetListTypeSelector> = (args) => (
  <TargetListTypeSelector {...args} />
);

export const Primary = Template.bind({});
