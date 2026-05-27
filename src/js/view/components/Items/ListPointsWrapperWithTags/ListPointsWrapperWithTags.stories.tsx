import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointsWrapperWithTags } from "./ListPointsWrapperWithTags";
import { IPrivateListPoint } from "../../../../interfaces";
import { privateListPointsFromBE } from "../../../../utils";

const privateListPoint =
  privateListPointsFromBE as unknown as IPrivateListPoint[];
export default {
  title: "components/ListPoint/ListPointsWrapperWithTags",
  component: ListPointsWrapperWithTags,
};

const Template: ComponentStory<typeof ListPointsWrapperWithTags> = (args) => (
  <ListPointsWrapperWithTags {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "title",
  listPoints: privateListPoint,
  tags: ["firstTag", "secondTag"],
  getListPointData: (index: number) => ({
    itemTemplate: <div>{privateListPoint[index].point.item.name}</div>,
    tag: privateListPoint[index].point.item.tags[0],
    name: privateListPoint[index].point.item.name,
    tags: ["firstTag"],
  }),
};

export const Empty = Template.bind({});
Empty.args = {
  listPoints: [],
};
