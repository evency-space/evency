import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointItemSelector } from "./ListPointItemSelector";

export default {
  title: "components/listPoint/ListPointItemSelector",
  component: ListPointItemSelector,
  args: {
    listPointName: "Банка газировки",
  },
};

const Template: ComponentStory<typeof ListPointItemSelector> = (args) => (
  <ListPointItemSelector {...args} />
);

export const Primary = Template.bind({});

export const WithLongName = Template.bind({});
WithLongName.args = {
  listPointName:
    "Холодная банка газировки с бодрящим Dr. Pepper (открывать в последний день)",
};

export const WithContent = Template.bind({});
WithContent.args = {
  content: <div>content</div>,
};

export const WithGrayTitle = Template.bind({});
WithGrayTitle.args = {
  grayTitle: true,
};
