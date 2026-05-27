import React from "react";
import { ComponentStory } from "@storybook/react";
import { TagsEditForm } from "./TagsEditForm";

const tags = [...Array<number>(100)].map((_, index) => `tag_${index}`);

export default {
  title: "pages/favorite/components/TagsEditForm",
  component: TagsEditForm,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

const Template: ComponentStory<typeof TagsEditForm> = (args) => (
  <TagsEditForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  tags,
  selectedTags: [],
};

export const WithoutTags = Template.bind({});
WithoutTags.args = {
  tags: [],
  selectedTags: [],
};

export const WithSingleTag = Template.bind({});
WithSingleTag.args = {
  tags: ["singleTag"],
  selectedTags: [],
};
