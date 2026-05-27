import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointsWithTags } from "./ListPointsWithTags";
import { IPrivateListPoint } from "../../../../interfaces";
import { privateListPointsFromBE } from "../../../../utils";

const privateListPoint =
  privateListPointsFromBE as unknown as IPrivateListPoint[];
export default {
  title: "components/ListPoint/ListPointsWithTags",
  component: ListPointsWithTags,
  args: {
    title: "Избранные вещи",
    tags: ["Зимний поход", "Трейл"],
  },
};

const Template: ComponentStory<typeof ListPointsWithTags> = (args) => (
  <ListPointsWithTags {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  listPoints: privateListPoint,
  getListPointData: (index: number) => ({
    itemTemplate: <div>{privateListPoint[index].point.item.name}</div>,
    tag: privateListPoint[index].point.item.tags[0],
    name: privateListPoint[index].point.item.name,
    tags: privateListPoint[index].point.item.tags.slice(1),
  }),
};

export const Empty = Template.bind({});
Empty.args = {
  listPoints: [],
};
