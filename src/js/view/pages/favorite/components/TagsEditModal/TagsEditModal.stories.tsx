import React from "react";
import { ComponentStory } from "@storybook/react";
import { TagsEditModal } from "./TagsEditModal";
import { mockedFavoritesListPointsApi } from "../../../../../api_clients";

const tagPattern = "tag_";
const selectedTagIndex = 1;
const selectedTag = `${tagPattern}${selectedTagIndex}`;

export default {
  title: "pages/favorite/components/TagsEditModal",
  component: TagsEditModal,
  parameters: {
    mockData: [mockedFavoritesListPointsApi.getTags],
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

const Template: ComponentStory<typeof TagsEditModal> = (args) => (
  <TagsEditModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  selectedTags: [],
};

export const WithSelectedTags = Template.bind({});
WithSelectedTags.args = {
  selectedTags: [selectedTag],
};
