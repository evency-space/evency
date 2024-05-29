import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListItemSelector } from "./ListItemSelector";

export default {
  title: "components/ListItemSelector",
  component: ListItemSelector,
  args: {
    listItemName: "Банка газировки",
  },
};

const Template: ComponentStory<typeof ListItemSelector> = (args) => (
  <ListItemSelector {...args} />
);

export const Primary = Template.bind({});

export const WithLongName = Template.bind({});
WithLongName.args = {
  listItemName:
    "Холодная банка газировки с бодрящим Dr. Pepper (открывать в последний день)",
};

export const OnlyContent = Template.bind({});
OnlyContent.args = {
  listItemName: undefined,
  content: <div>content</div>,
};

export const WithContent = Template.bind({});
WithContent.args = {
  content: <div>content</div>,
};

export const WithGrayTitle = Template.bind({});
WithGrayTitle.args = {
  grayTitle: true,
};

export const WithRadio = Template.bind({});
WithRadio.args = {
  variant: "radio",
};
