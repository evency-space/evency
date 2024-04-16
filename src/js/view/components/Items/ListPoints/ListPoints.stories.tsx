import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPoints } from "./ListPoints";
import { IPrivateListPoint } from "../../../../interfaces";
import { privateListPointsFromBE } from "../../../../utils";

const privateListPoint =
  privateListPointsFromBE as unknown as IPrivateListPoint[];
export default {
  title: "components/ListPoint/ListPoints",
  component: ListPoints,
};

const Template: ComponentStory<typeof ListPoints> = (args) => (
  <ListPoints {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  listPoints: privateListPoint,
  getListPointData: (index: number) => ({
    itemTemplate: <div>{privateListPoint[index].point.item.name}</div>,
    tag: privateListPoint[index].point.item.tags[0],
    name: privateListPoint[index].point.item.name,
  }),
};

export const Empty = Template.bind({});
Empty.args = {
  listPoints: [],
};

export const WithPrependListContent = Template.bind({});
WithPrependListContent.args = {
  listPoints: privateListPoint,
  getListPointData: (index: number) => ({
    itemTemplate: <div>{privateListPoint[index].point.item.name}</div>,
    tag: privateListPoint[index].point.item.tags[0],
    name: privateListPoint[index].point.item.name,
  }),
  contentBeforeList: <div>prepend list content</div>,
};
